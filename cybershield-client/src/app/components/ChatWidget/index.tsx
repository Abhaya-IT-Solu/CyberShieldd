"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Minimize2, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import clsx from "clsx";
import Markdown from "react-markdown";
import { brand } from "@/config/brand";

const PROMPT_MESSAGES = [
    "Need any assistance?",
    "How can I help you?",
    "Ask me about our services",
];

const SUGGESTIONS = [
    "What services do you offer?",
    "Do you do penetration testing?",
    "How does an engagement work?",
    "I'd like to book a consultation",
];

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const hasInteracted = useRef(false);
    const promptTimerRef = useRef<NodeJS.Timeout | null>(null);
    const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPromptMessage(PROMPT_MESSAGES[Math.floor(Math.random() * PROMPT_MESSAGES.length)]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (hasInteracted.current) return;
        promptTimerRef.current = setTimeout(() => {
            if (!hasInteracted.current && !isOpen) {
                setShowPrompt(true);
                dismissTimerRef.current = setTimeout(() => setShowPrompt(false), 4000);
            }
        }, 2500);
        return () => {
            if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
            if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
        };
    }, [isOpen]);

    const handleToggleChat = useCallback(() => {
        hasInteracted.current = true;
        setShowPrompt(false);
        setIsOpen((prev) => !prev);
        if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    // Send a message. Pass `override` to send text directly (e.g. suggestion chips).
    const sendMessage = async (override?: string) => {
        const text = (override ?? input).trim();
        if (!text || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        const assistantId = (Date.now() + 1).toString();
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to get response");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) throw new Error("No response body");

            let accumulatedText = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                for (const line of chunk.split("\n")) {
                    if (line.startsWith("data: ")) {
                        const data = line.slice(6);
                        if (data === "[DONE]") continue;
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) {
                                accumulatedText += parsed.text;
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === assistantId ? { ...m, content: accumulatedText } : m
                                    )
                                );
                            }
                        } catch {
                            // Skip invalid JSON lines
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === assistantId
                        ? {
                              ...m,
                              content:
                                  error instanceof Error
                                      ? `Sorry, I ran into a problem: ${error.message}`
                                      : "Sorry, something went wrong. Please try again.",
                          }
                        : m
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Notification prompt bubble */}
            <div
                className={clsx(
                    "fixed bottom-24 right-6 z-50 max-w-[210px] rounded-2xl rounded-br-sm px-4 py-3",
                    "liquid-glass text-sm font-medium text-white/90 shadow-xl shadow-black/30",
                    "transition-all duration-300 ease-out",
                    showPrompt
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0"
                )}
                role="status"
                aria-live="polite"
            >
                {promptMessage}
            </div>

            {/* Chat panel */}
            <div
                // position:fixed inline — .liquid-glass forces position:relative,
                // which would otherwise drop this out of fixed positioning.
                style={{ position: "fixed" }}
                className={clsx(
                    "bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden",
                    "liquid-glass rounded-[28px] border border-white/10 bg-[#0b1a2e]/40 backdrop-blur-2xl",
                    "shadow-2xl shadow-black/50 transition-all duration-300 ease-out origin-bottom-right",
                    isOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-4 scale-95 opacity-0"
                )}
                role="dialog"
                aria-label="Chat Assistant"
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700">
                            <ShieldCheck size={17} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-display text-lg leading-none text-white">Assistant</h2>
                            <p className="mt-1 text-xs text-white/45">{brand.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-2 text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Minimize chat"
                    >
                        <Minimize2 size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex h-[360px] flex-col gap-3 overflow-y-auto px-4 py-4 scrollbar-none">
                    {messages.length === 0 ? (
                        <div className="flex flex-1 flex-col justify-center">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-700/20 ring-1 ring-white/10">
                                    <Sparkles size={20} className="text-sky-300" />
                                </div>
                                <p className="text-sm text-white/80">How can we help today?</p>
                                <p className="mt-1 text-xs text-white/40">
                                    Ask about our services or start a project.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => sendMessage(s)}
                                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-sm text-white/70 transition-all hover:border-sky-400/40 hover:bg-white/[0.06] hover:text-white"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={clsx(
                                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-lg shadow-black/20",
                                        message.role === "user"
                                            ? "ml-auto rounded-br-sm bg-gradient-to-br from-sky-500 to-blue-700 text-white"
                                            : "mr-auto rounded-bl-sm border border-white/15 bg-white/[0.1] backdrop-blur-xl text-white"
                                    )}
                                >
                                    {message.content ? (
                                        message.role === "assistant" ? (
                                            <Markdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                                    ul: ({ children }) => <ul className="mb-2 list-inside list-disc space-y-1">{children}</ul>,
                                                    ol: ({ children }) => <ol className="mb-2 list-inside list-decimal space-y-1">{children}</ol>,
                                                    li: ({ children }) => <li className="text-white/80">{children}</li>,
                                                    h1: ({ children }) => <h1 className="mb-2 text-base font-bold text-white">{children}</h1>,
                                                    h2: ({ children }) => <h2 className="mb-2 text-sm font-bold text-white">{children}</h2>,
                                                    h3: ({ children }) => <h3 className="mb-1 text-sm font-semibold text-white">{children}</h3>,
                                                    a: ({ href, children }) => (
                                                        <a href={href} className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
                                                            {children}
                                                        </a>
                                                    ),
                                                    code: ({ children }) => (
                                                        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">
                                                            {children}
                                                        </code>
                                                    ),
                                                }}
                                            >
                                                {message.content}
                                            </Markdown>
                                        ) : (
                                            message.content
                                        )
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-white/50">
                                            <Loader2 size={14} className="animate-spin" />
                                            Thinking...
                                        </span>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="border-t border-white/10 bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-white/35 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                            disabled={isLoading}
                            aria-label="Chat message input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={clsx(
                                "liquid-glass flex h-11 w-11 items-center justify-center rounded-xl text-white transition-all",
                                isLoading || !input.trim()
                                    ? "cursor-not-allowed opacity-50"
                                    : "hover:scale-105"
                            )}
                            aria-label="Send message"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating button */}
            <button
                onClick={handleToggleChat}
                // Inline styles override .liquid-glass: position:fixed (the class
                // forces relative) and a visible tinted fill (the class's white/3
                // is near-invisible on the dark page). Glass ring is preserved.
                style={{ position: "fixed", background: "rgba(90,150,230,0.22)" }}
                className={clsx(
                    "liquid-glass bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
                    "shadow-lg shadow-sky-500/30",
                    "transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-sky-500/50",
                    "focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-[#08131f]"
                )}
                aria-label={isOpen ? "Close chat" : "Open chat assistant"}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
            >
                <div className={clsx("transition-transform duration-300", isOpen ? "rotate-90" : "rotate-0")}>
                    {isOpen ? <X size={24} className="text-white" /> : <Sparkles size={22} className="text-white" />}
                </div>
            </button>
        </>
    );
}

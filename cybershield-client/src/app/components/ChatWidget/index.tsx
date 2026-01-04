"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Minimize2, Loader2 } from "lucide-react";
import clsx from "clsx";
import Markdown from "react-markdown";

// Notification messages pool
const PROMPT_MESSAGES = [
    "Need any assistance?",
    "How can I help you?",
    "Ask me about our services",
];

// Message type
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

    // Select random message on mount
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * PROMPT_MESSAGES.length);
        setPromptMessage(PROMPT_MESSAGES[randomIndex]);
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle notification prompt timing
    useEffect(() => {
        if (hasInteracted.current) return;

        promptTimerRef.current = setTimeout(() => {
            if (!hasInteracted.current && !isOpen) {
                setShowPrompt(true);

                dismissTimerRef.current = setTimeout(() => {
                    setShowPrompt(false);
                }, 3000);
            }
        }, 2500);

        return () => {
            if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
            if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
        };
    }, [isOpen]);

    // Handle chat toggle
    const handleToggleChat = useCallback(() => {
        hasInteracted.current = true;
        setShowPrompt(false);
        setIsOpen((prev) => !prev);

        if (promptTimerRef.current) clearTimeout(promptTimerRef.current);
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    }, []);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle escape key to close chat
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    // Send message to API and handle streaming response
    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        // Add user message and clear input
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Create placeholder for assistant response
        const assistantId = (Date.now() + 1).toString();
        setMessages((prev) => [
            ...prev,
            { id: assistantId, role: "assistant", content: "" },
        ]);

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

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error("No response body");
            }

            let accumulatedText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const data = line.slice(6);
                        if (data === "[DONE]") continue;

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) {
                                accumulatedText += parsed.text;
                                // Update the assistant message with accumulated text
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === assistantId
                                            ? { ...m, content: accumulatedText }
                                            : m
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
            // Update assistant message with error
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === assistantId
                        ? {
                            ...m,
                            content:
                                error instanceof Error
                                    ? `Sorry, I encountered an error: ${error.message}`
                                    : "Sorry, something went wrong. Please try again.",
                        }
                        : m
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    // Handle key press (Enter to send)
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Notification Prompt Bubble */}
            <div
                className={clsx(
                    "fixed bottom-24 right-6 z-50",
                    "max-w-[200px] px-4 py-3 rounded-2xl rounded-br-sm",
                    "bg-gradient-to-br from-neutral-800 to-neutral-900",
                    "border border-neutral-700/50",
                    "text-white text-sm font-medium",
                    "shadow-xl shadow-black/20",
                    "transition-all duration-300 ease-out",
                    showPrompt
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                )}
                role="status"
                aria-live="polite"
            >
                {promptMessage}
            </div>

            {/* Chat Container */}
            <div
                className={clsx(
                    "fixed bottom-24 right-6 z-50",
                    "w-[380px] max-w-[calc(100vw-48px)]",
                    "bg-neutral-900/80 backdrop-blur-[7px] supports-[backdrop-filter]:backdrop-blur-[7px] [-webkit-backdrop-filter:blur(8px)] border-b border-white/10 rounded-[30px] -translate-y-full opacity-0",
                    "border border-neutral-700/50",
                    "rounded-2xl overflow-hidden",
                    "shadow-2xl shadow-black/40",
                    "transition-all duration-300 ease-out origin-bottom-right",
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                )}
                role="dialog"
                aria-label="Chat Assistant"
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/50 border-b border-neutral-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <MessageCircle size={16} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-white font-semibold text-sm">Assistant</h2>
                            <p className="text-neutral-400 text-xs">Abhaya IT Solutions</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-neutral-700/50 transition-colors text-neutral-400 hover:text-white"
                        aria-label="Minimize chat"
                    >
                        <Minimize2 size={18} />
                    </button>
                </div>

                {/* Message Area */}
                <div className="h-[350px] px-4 py-4 overflow-y-auto flex flex-col gap-3 scrollbar-none">
                    {messages.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center ">
                            <p className="text-neutral-500 text-sm text-center">
                                How can we help you today?
                                <br />
                                <span className="text-xs text-neutral-600">
                                    Ask about our services
                                </span>
                            </p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={clsx(
                                        "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm",
                                        message.role === "user"
                                            ? "ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                                            : "mr-auto bg-neutral-800 text-neutral-100 rounded-bl-sm"
                                    )}
                                >
                                    {message.content ? (
                                        message.role === "assistant" ? (
                                            <Markdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                                    li: ({ children }) => <li className="text-neutral-200">{children}</li>,
                                                    h1: ({ children }) => <h1 className="font-bold text-base mb-2 text-white">{children}</h1>,
                                                    h2: ({ children }) => <h2 className="font-bold text-sm mb-2 text-white">{children}</h2>,
                                                    h3: ({ children }) => <h3 className="font-semibold text-sm mb-1 text-white">{children}</h3>,
                                                    a: ({ href, children }) => (
                                                        <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                                                            {children}
                                                        </a>
                                                    ),
                                                    code: ({ children }) => (
                                                        <code className="bg-neutral-700 px-1.5 py-0.5 rounded text-xs font-mono">
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
                                        <span className="inline-flex items-center gap-1 text-neutral-400">
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

                {/* Input Area */}
                <form
                    onSubmit={handleSubmit}
                    className="px-4 py-3 border-t border-neutral-700/50 bg-neutral-800/30"
                >
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 bg-neutral-700/50 border border-neutral-600/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-700/50 transition-all"
                            disabled={isLoading}
                            aria-label="Chat message input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={clsx(
                                "p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white transition-all",
                                isLoading || !input.trim()
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:opacity-90 hover:scale-105"
                            )}
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Send size={18} />
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating Chat Button */}
            <button
                onClick={handleToggleChat}
                className={clsx(
                    "fixed bottom-6 right-6 z-50",
                    "w-14 h-14 rounded-full",
                    "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900",
                    "border border-neutral-600/50",
                    "flex items-center justify-center",
                    "shadow-lg shadow-black/30",
                    "transition-all duration-300 ease-out",
                    "hover:scale-105 hover:shadow-xl hover:shadow-black/40",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-neutral-900",
                    "group"
                )}
                aria-label={isOpen ? "Close chat" : "Open chat assistant"}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
            >
                <div
                    className={clsx(
                        "transition-transform duration-300",
                        isOpen ? "rotate-90" : "rotate-0"
                    )}
                >
                    {isOpen ? (
                        <X size={24} className="text-white" />
                    ) : (
                        <MessageCircle
                            size={24}
                            className="text-white group-hover:text-blue-400 transition-colors"
                        />
                    )}
                </div>
            </button>
        </>
    );
}

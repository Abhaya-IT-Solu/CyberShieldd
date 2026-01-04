import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

// ============================================================
// API KEY CONFIGURATION
// TODO: Replace this placeholder with your environment variable
// In production, use: process.env.GEMINI_API_KEY
// ============================================================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// System prompt with detailed company context for Abhaya IT Solutions
const SYSTEM_PROMPT = `You are the AI assistant for **Abhaya IT Solutions**, a premier IT services and consulting company. Your name is "Abhaya Assistant".

## About Abhaya IT Solutions

**Company Overview:**
Abhaya IT Solutions is a trusted technology partner helping businesses achieve digital transformation through innovative IT solutions. We combine technical expertise with strategic thinking to deliver measurable results.

**Our Core Services:**

1. **Cybersecurity Solutions**
   - Security audits and penetration testing
   - Threat detection and incident response
   - Compliance consulting (GDPR, HIPAA, SOC2)
   - Security awareness training

2. **Software Development**
   - Custom web and mobile applications
   - Enterprise software solutions
   - API development and integration
   - Legacy system modernization

3. **Cloud Solutions**
   - Cloud migration and architecture
   - AWS, Azure, and Google Cloud expertise
   - DevOps and CI/CD implementation
   - Managed cloud services

4. **Digital Marketing**
   - SEO and content strategy
   - Performance marketing
   - Brand identity and design
   - Analytics and conversion optimization

5. **IT Consulting**
   - Technology strategy and roadmaps
   - Digital transformation advisory
   - Process automation
   - Team augmentation

**Why Choose Us:**
- Experienced team of certified professionals
- Client-centric approach with dedicated support
- Proven track record across industries
- Competitive pricing with flexible engagement models

## Your Role & Guidelines

**Tone:** Professional, friendly, and helpful. Be conversational but not overly casual.

**Response Format:**
- Use **bullet points** for lists
- Use **bold text** for emphasis on key points
- Keep paragraphs short (2-3 sentences max)
- Use headings when organizing longer responses

**Behavior:**
- Answer questions about our services clearly and concisely
- Highlight relevant benefits based on the user's query
- For pricing inquiries, explain that pricing is customized and suggest contacting our team
- If unsure about specific details, acknowledge it and offer to connect them with our team
- Always end with a helpful call-to-action when appropriate

**Contact Information:**
Direct users to our contact page at /#contact or suggest scheduling a consultation for detailed discussions.

Remember: You represent Abhaya IT Solutions. Be helpful, accurate, and maintain a professional image.`;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(request: NextRequest) {
    try {
        // Validate API key
        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
            return new Response(
                JSON.stringify({
                    error: "API key not configured. Please set GEMINI_API_KEY environment variable."
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: "Invalid request: messages array required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Get the Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: SYSTEM_PROMPT,
        });

        // Convert messages to Gemini format
        const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        // Get the latest user message
        const latestMessage = messages[messages.length - 1];
        if (!latestMessage || latestMessage.role !== "user") {
            return new Response(
                JSON.stringify({ error: "Last message must be from user" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Start chat with history
        const chat = model.startChat({ history });

        // Generate streaming response
        const result = await chat.sendMessageStream(latestMessage.content);

        // Create a readable stream from the Gemini response
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            // Send as Server-Sent Events format
                            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text })}\n\n`));
                        }
                    }
                    controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
                    controller.close();
                } catch (error) {
                    console.error("Streaming error:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "An error occurred"
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

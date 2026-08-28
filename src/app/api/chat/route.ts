import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are AI GovAssist, an official, professional, and highly helpful virtual assistant for the GovConnect portal, a unified platform for government services in India. 
Your primary role is to assist citizens with government services, applications, schemes, documents, and related information. 
You must strictly adhere to this role. Do not answer questions or engage in conversations outside the scope of government services, civic duties, or the GovConnect platform. 
If a user asks something unrelated (e.g., coding help, general knowledge, recipes, creative writing), politely decline and remind them that you are AI GovAssist, designed exclusively to help with government-related queries.
Keep your answers concise, clear, and easy to understand for the general public.
DO NOT use Markdown formatting (like **, _, or #) in your responses. Output only plain text.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing");
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    // Prepend the system prompt to the user's messages
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen/qwen3.6-27b", // Fast and capable model
        messages: groqMessages,
        temperature: 0.2, // Keep it deterministic and professional
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API error:", errorData);
      return NextResponse.json({ error: "Failed to communicate with AI provider" }, { status: 502 });
    }

    const data = await response.json();
    let rawContent = data.choices[0].message.content;
    
    // Strip <think>...</think> reasoning blocks from Qwen/Deepseek models
    rawContent = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '');
    
    // Strip markdown formatting symbols (like **bold**, _italic_, # headings, etc.)
    rawContent = rawContent.replace(/(\*\*|__|\*|_|#)/g, '').trim();

    return NextResponse.json({ message: rawContent });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

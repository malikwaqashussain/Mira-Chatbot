//Fetch them from Supabase 
//Create embeddings >>store in Supabase 0r in-memory for now + Query them with LangChain when user asks


import { NextRequest, NextResponse } from 'next/server'import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { ChatOpenAI } from "langchain/chat_models/openai";

// 1. Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const question = body.message;

  // 2. Create vector store
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    { client: supabase, tableName: "documents", queryName: "match_documents" }
  );

  // 3. Query DB using RAG
  const retriever = vectorStore.asRetriever();
  const docs = await retriever.getRelevantDocuments(question);

  // 4. Generate chatbot answer
  const model = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
  const response = await model.call([
    { role: "system", content: "You are a restaurant chatbot that answers with menu prices." },
    { role: "user", content: `Question: ${question}\nDocs: ${JSON.stringify(docs)}` }
  ]);

  return NextResponse.json({ reply: response.content });
}


export async function POST(request: NextRequest) {
  try {
    const { message, conversation } = await request.json()

    // Replace this with your actual OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!openaiApiKey) {
      // Fallback response when OpenAI is not configured
      const fallbackResponses = [
        "I'd be happy to help you with your food order! Our specialties include gourmet burgers, artisan pizzas, and fresh salads. What catches your eye?",
        "Great question! All our ingredients are locally sourced and fresh. Would you like me to recommend something based on your preferences?",
        "Our kitchen can accommodate most dietary restrictions. We have vegetarian, vegan, and gluten-free options available. What would you like to know more about?",
        "Delivery usually takes 25-35 minutes depending on your location. We'll keep you updated with real-time tracking. Anything else I can help with?",
        "Our most popular items are the Classic Beef Burger and the Margherita Pizza. Both are made with premium ingredients. Would you like to add either to your order?"
      ]
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      
      return NextResponse.json({ message: randomResponse })
    }

    // Prepare the conversation context for OpenAI
    const systemMessage = {
      role: 'system',
      content: 'You are a helpful food ordering assistant for a restaurant. Be friendly, knowledgeable about the menu, and help customers with their orders. Our menu includes burgers, pizzas, salads, and beverages. Keep responses concise and helpful.'
    }

    const messages = [
      systemMessage,
      ...conversation.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request."

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: "I'm having trouble right now, but I'm here to help with your food order! What would you like to know about our menu?" },
      { status: 200 }
    )
  }
}

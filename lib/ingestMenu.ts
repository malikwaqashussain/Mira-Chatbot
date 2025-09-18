import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function ingestMenu() {
  // Fetch menu from Supabase SQL
  const { data: menu } = await supabase.from("menu").select("*");

  if (!menu) return;

  // Convert each menu item into text
  const docs = menu.map((item) => ({
    pageContent: `${item.name} costs ${item.price} ${item.currency}`,
    metadata: { id: item.id },
  }));

  // Store in vector DB
  await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    { client: supabase, tableName: "documents" }
  );

  console.log("✅ Menu ingested into vector DB");
}

ingestMenu();


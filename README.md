# FoodieHub - Food Ordering App with AI + RAG Chatbot

A modern, responsive food ordering application built with **Next.js**, featuring real-time order management through **Supabase**, a **RAG-powered OpenAI chatbot** for customer support, and intelligent menu pricing queries using **LangChain + vector database**.

## 🚀 Features

### Core Functionality

* **Guest Ordering System**: Customers can order immediately without authentication
* **Real-time Order Management**: Orders stored and managed through Supabase
* **AI-Powered Chatbot with RAG**: OpenAI + LangChain integration for intelligent support
* **Menu Pricing via RAG**: Chatbot fetches up-to-date prices from Supabase vector store
* **Responsive Design**: Optimized for desktop, tablet, and mobile
* **Category Filtering**: Browse menu items by category
* **Shopping Cart**: Add/remove items with quantity management
* **Order Confirmation & Tracking**: Customers receive tracking ID after checkout

### User Experience

* **Modern UI/UX**: Clean and intuitive interface
* **Floating Chatbot**: AI assistant always available
* **Real-time Cart Updates**
* **Order Tracking**: Check status with order ID
* **Mobile-First Design**

---

## 🛠 Tech Stack

* **Frontend**: Next.js 13+ (TypeScript)
* **Styling**: Tailwind CSS + shadcn/ui
* **Database**: Supabase (PostgreSQL)
* **Vector Store**: Supabase Vector DB (LangChain integration)
* **AI Integration**: OpenAI GPT-3.5-turbo with RAG pipeline
* **Icons**: Lucide React
* **Deployment**: Vercel-ready

---

## 📦 Project Structure

```
├── app/
│   ├── api/chat/route.ts          # Chatbot API (OpenAI + LangChain RAG)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── ChatBot.tsx                # Floating chatbot component
│   └── OrderDialog.tsx
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── ingestMenu.ts              # Script to ingest SQL menu → vector DB
│   └── utils.ts
├── supabase/
│   └── migrations/
└── README.md
```

---

## 🗄 Database Schema

### Orders Table

```sql
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  items jsonb NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Menu Table (SQL → Vector DB)

```sql
CREATE TABLE menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  category text,
  description text
);
```

These records are embedded using **LangChain’s OpenAI embeddings** and stored in **Supabase vector store** for chatbot queries.

---

## 🤖 AI Chatbot with RAG

### How It Works

* User asks: *“How much is the Chicken Biryani?”*
* Chatbot retrieves relevant pricing from **Supabase vector DB**
* OpenAI GPT-3.5-turbo generates a natural response:
  *“Chicken Biryani costs \$12.99.”*

### Capabilities

* Menu recommendations + pricing queries
* Dietary restriction help
* Order status lookups
* Delivery time estimates
* Restaurant FAQs

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* Supabase account
* OpenAI API key

### Installation

```bash
npm install
```

### Setup Environment

Add `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

### Ingest Menu into Vector DB

```bash
ts-node lib/ingestMenu.ts
```

### Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔧 API Endpoints

### Chat API (`/api/chat`)

```json
POST /api/chat
{
  "message": "What’s the price of Margherita Pizza?"
}
```

**Response**:

```json
{
  "reply": "Margherita Pizza costs $9.50."
}
```

---

## 🎯 Future Enhancements

* Payment gateway (Stripe/PayPal)
* Multi-language chatbot support
* Admin dashboard
* Real-time notifications (WebSocket)
* Fine-tuned AI models for restaurant-specific FAQs

---

**Built with ❤️ using Next.js, Supabase, LangChain, and OpenAI**

---

Would you like me to also **add an architecture diagram (Mermaid.js)** in your README that visually shows `User → Chatbot → LangChain RAG → Supabase (SQL + Vector Store) → Response`? That would make it much easier for new devs to understand.

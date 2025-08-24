# Mira-Chatbot

# FoodieHub - Food Ordering App with AI Chatbot

A modern, responsive food ordering application built with Next.js, featuring real-time order management through Supabase and an intelligent OpenAI-powered chatbot for customer support.

## 🚀 Features

### Core Functionality
- **Guest Ordering System**: No authentication required - customers can order immediately
- **Real-time Order Management**: Orders stored and managed through Supabase database
- **AI-Powered Chatbot**: OpenAI integration for intelligent customer support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Category Filtering**: Browse menu items by category (Burgers, Pizza, Salads, etc.)
- **Shopping Cart**: Add/remove items with quantity management
- **Order Confirmation**: Complete order flow with customer information collection

### User Experience
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Cart Updates**: Instant feedback when adding/removing items
- **Floating Chatbot**: Accessible AI assistant available throughout the experience
- **Order Tracking**: Customers receive order confirmation with tracking ID
- **Mobile-First Design**: Optimized for mobile ordering experience

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Deployment**: Static export ready

## 📦 Project Structure

```
├── app/
│   ├── api/chat/route.ts          # OpenAI chatbot API endpoint
│   ├── globals.css                # Global styles and CSS variables
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Main application page
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── ChatBot.tsx                # AI chatbot component
│   └── OrderDialog.tsx            # Order completion modal
├── lib/
│   ├── supabase.ts                # Supabase client and types
│   └── utils.ts                   # Utility functions
├── supabase/
│   └── migrations/                # Database schema migrations
└── README.md
```

## 🗄 Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  items jsonb NOT NULL,              -- Array of ordered items
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',     -- pending, confirmed, preparing, ready, delivered
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Row Level Security (RLS)
- **Public Insert**: Anyone can create orders (guest ordering)
- **Public Read**: Anyone can read orders (for status checking)
- **Automatic Timestamps**: Updated timestamp on modifications

## 🤖 AI Chatbot Features

### OpenAI Integration
- **Model**: GPT-3.5-turbo for cost-effective, responsive interactions
- **Context Awareness**: Maintains conversation history for better responses
- **Fallback Responses**: Graceful handling when OpenAI is unavailable
- **Restaurant-Specific**: Trained to assist with menu questions and ordering

### Chatbot Capabilities
- Menu recommendations and descriptions
- Dietary restriction assistance
- Order status inquiries
- Delivery time estimates
- General restaurant information
- Friendly, conversational tone

### Chat Interface
- **Floating Button**: Always accessible from bottom-right corner
- **Smooth Animations**: Slide-up modal with professional appearance
- **Message History**: Persistent conversation during session
- **Typing Indicators**: Visual feedback during AI response generation
- **Mobile Optimized**: Touch-friendly interface for mobile users

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- OpenAI API key (optional, has fallback responses)

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up Supabase**:
   - Click "Connect to Supabase" in the top-right corner
   - Create a new Supabase project or connect existing one
   - The database schema will be automatically created

3. **Configure OpenAI (Optional)**:
   - Add your OpenAI API key to environment variables:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   - If not configured, the chatbot will use intelligent fallback responses

4. **Start development server**:
```bash
npm run dev
```

5. **Open application**:
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#F97316) - Warm, appetizing brand color
- **Success**: Green (#22C55E) - Order confirmations and success states
- **Neutral**: Gray scale for text and backgrounds
- **Accent**: Amber tones for highlights and hover states

### Typography
- **Font**: Inter - Clean, modern, highly readable
- **Hierarchy**: Clear distinction between headings, body text, and captions
- **Line Height**: 150% for body text, 120% for headings

### Components
- **Cards**: Elevated design with subtle shadows
- **Buttons**: Rounded corners with smooth hover transitions
- **Badges**: Contextual labels for categories and status
- **Modal**: Centered overlays with backdrop blur

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column layout, touch-optimized
- **Tablet**: 768px - 1024px - Two column grid
- **Desktop**: > 1024px - Three column grid with sidebar

### Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Optimized cart summary for mobile screens
- Swipe-friendly card interactions
- Mobile-first chatbot interface

## 🔧 API Endpoints

### Chat API (`/api/chat`)
**POST** request with:
```json
{
  "message": "User message",
  "conversation": [
    {
      "id": "1",
      "content": "Previous message",
      "isUser": true,
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Response**:
```json
{
  "message": "AI assistant response"
}
```

## 🛡 Security Features

### Database Security
- **Row Level Security (RLS)**: Enabled on all tables
- **Public Access**: Controlled access for guest ordering
- **Data Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries through Supabase

### API Security
- **Rate Limiting**: Implemented through Vercel/hosting platform
- **Input Sanitization**: All user inputs are sanitized
- **Error Handling**: Graceful error responses without exposing internals

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Static Export
The app is configured for static export and can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

### Environment Variables
Required for production:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (optional)

## 🎯 Future Enhancements

### Planned Features
- **User Authentication**: Optional account creation for order history
- **Payment Integration**: Stripe or PayPal integration
- **Real-time Notifications**: Order status updates via WebSocket
- **Admin Dashboard**: Restaurant management interface
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Order tracking and customer insights

### Technical Improvements
- **Caching**: Redis integration for better performance
- **Image Optimization**: CDN integration for food images
- **PWA Support**: Offline functionality and app-like experience
- **Advanced AI**: Custom fine-tuned models for restaurant-specific responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui**: Beautiful, accessible UI components
- **Supabase**: Backend-as-a-Service platform
- **OpenAI**: AI-powered chatbot capabilities
- **Pexels**: High-quality food photography
- **Lucide**: Clean, consistent icon set

---

**Built with ❤️ using Next.js, Supabase, and OpenAI**
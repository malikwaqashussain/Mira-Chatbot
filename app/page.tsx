//Connect Frontend Chat UI
"use client";
import { useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setChat([...chat, "You: " + msg, "Bot: " + data.reply]);
    setMsg("");
  }

  return (
    <div>
      <div>
        {chat.map((c, i) => (
          <p key={i}>{c}</p>
        ))}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}


'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import OrderDialog from '@/components/OrderDialog'
import { Plus, Minus, ShoppingCart, Star, Clock, Users } from 'lucide-react'
import type { OrderItem } from '@/lib/supabase'
import ChatBot from '@/components/ChatBot/ChatBot'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  prepTime: string
  popular?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and our special sauce',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Burgers',
    rating: 4.8,
    prepTime: '15-20 min',
    popular: true
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on crispy thin crust',
    price: 16.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pizza',
    rating: 4.9,
    prepTime: '20-25 min',
    popular: true
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan, croutons, and caesar dressing',
    price: 9.99,
    image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Salads',
    rating: 4.6,
    prepTime: '10-12 min'
  },
  {
    id: '4',
    name: 'Chicken Wings',
    description: 'Crispy wings tossed in your choice of buffalo, BBQ, or honey garlic sauce',
    price: 11.99,
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Appetizers',
    rating: 4.7,
    prepTime: '18-22 min'
  },
  {
    id: '5',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella cheese on our signature dough',
    price: 18.99,
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Pizza',
    rating: 4.8,
    prepTime: '20-25 min'
  },
  {
    id: '6',
    name: 'Fish Tacos',
    description: 'Grilled fish with cabbage slaw, avocado, and chipotle cream in soft tortillas',
    price: 13.99,
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Mexican',
    rating: 4.5,
    prepTime: '15-18 min'
  }
]

export default function Home() {
  const [cart, setCart] = useState<OrderItem[]>([])
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))]

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId)
      }
    })
  }

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-orange-600">FoodieHub</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsOrderDialogOpen(true)}
                className="relative bg-orange-500 hover:bg-orange-600"
                disabled={cart.length === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food
              <span className="block text-orange-200">Delivered Fresh</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Order from our curated menu of gourmet dishes made with love
            </p>
            <div className="flex items-center justify-center space-x-8 text-orange-200">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                <span>Top Rated</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>1000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => {
            const quantity = getItemQuantity(item.id)
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.popular && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      Popular
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    {item.rating}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-xl font-bold text-orange-600">${item.price}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.prepTime}
                    </span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>

                  {quantity === 0 ? (
                    <Button
                      onClick={() => addToCart(item)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        variant="outline"
                        size="sm"
                        className="border-orange-200 hover:bg-orange-50"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="mx-4 font-semibold text-lg">{quantity}</span>
                      <Button
                        onClick={() => addToCart(item)}
                        variant="outline"
                        size="sm"
                        className="border-orange-200 hover:bg-orange-50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-20 z-40">
          <Card className="bg-white shadow-2xl border-0">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{getTotalItems()} items in cart</div>
                <div className="text-2xl font-bold text-orange-600">${getTotalPrice().toFixed(2)}</div>
              </div>
              <Button
                onClick={() => setIsOrderDialogOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 px-8"
              >
                View Cart & Checkout
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Order Dialog */}
      <OrderDialog
        isOpen={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
        items={cart}
        total={getTotalPrice()}
      />

      {/* Chat Bot */}
      <ChatBot />
    </div>
  )
}

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send, Bot, User, BotIcon } from 'lucide-react'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatBotProps {
  onClose?: () => void
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m your food ordering assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simulate OpenAI API call - replace with actual endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversation: messages
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'I\'m sorry, I couldn\'t process your request right now. Please try again later.',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'m having trouble connecting right now. Our menu includes delicious burgers, pizzas, and salads. What would you like to know more about?',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (onClose && isOpen) {
      onClose()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <div
          className="bg-orange-500 hover:bg-orange-600 rounded-full p-5 cursor-pointer"
          onClick={toggleChat}
        >
          <BotIcon className="h-10 w-10" color='white'/>
        </div>

      )}

      {isOpen && (
        <Card className="w-96 h-[500px] shadow-2xl border-0 bg-white overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Food Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="hover:bg-orange-600 text-white h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[360px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.isUser
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div className="text-sm">{message.content}</div>
                    {message.isUser && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our menu, hours, or delivery..."
                className="flex-1 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-orange-500 hover:bg-orange-600"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Order {
  id?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  items: OrderItem[]
  total_amount: number
  status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}
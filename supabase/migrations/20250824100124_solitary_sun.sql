/*
  # Create orders table for food ordering app

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text) 
      - `customer_phone` (text)
      - `items` (jsonb) - array of ordered items with quantities
      - `total_amount` (decimal)
      - `status` (text) - pending, confirmed, preparing, ready, delivered
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for public insert (guest ordering)
    - Add policy for public read (order status checking)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  items jsonb NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert orders (guest ordering)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to read orders (for status checking)
CREATE POLICY "Anyone can read orders"
  ON orders
  FOR SELECT
  TO anon
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'FoodieHub - Delicious Food Delivered Fresh',
  description: 'Order from our curated menu of gourmet dishes made with love. Fast delivery, top-rated meals, and exceptional customer service.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
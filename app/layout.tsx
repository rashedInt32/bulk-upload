import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import BaseWrapper from './base-wrapper'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Employee Bulk Upload',
  description: 'Bulk upload employees to your database',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        <BaseWrapper>{children}</BaseWrapper>
      </body>
    </html>
  )
}

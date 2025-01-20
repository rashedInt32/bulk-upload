'use client'
import { Sidebar } from '@/components/base/sidebar'
import { Header } from '@/components/base/header'

export default function BulkUploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar>{/* Sidebar content goes here */}</Sidebar>
      <div className="flex-1 flex flex-col bg-surface-2">
        <Header
          title="Employees"
          buttonLabel="Add Employee"
          onButtonClick={() => {
            // Handle button click
          }}
        />
        <main>{children}</main>
      </div>
    </div>
  )
}

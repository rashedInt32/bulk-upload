'use client'
import { Sidebar } from '@/components/base/sidebar'
import { Header } from '@/components/base/header'
import { useStore } from './_hooks/useStore'

export default function BulkUploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { fileData } = useStore((state) => state)

  return (
    <div className="flex min-h-screen">
      <Sidebar>{/* Sidebar content goes here */}</Sidebar>
      <div className="flex-1 flex flex-col bg-surface-2">
        <Header
          title="Employees"
          buttonLabel="Add Employee"
          showButton={!!fileData}
          onButtonClick={() => {
            // Handle button click
          }}
        />
        <main className="bg-surface2">{children}</main>
      </div>
    </div>
  )
}

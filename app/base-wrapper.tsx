'use client'
import { Sidebar } from '@/components/base/sidebar'
import { Header } from '@/components/base/header'
import { useStore } from '@/app/(employees)/_hooks/useStore'

export default function BaseWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { fileData } = useStore((state) => state)

  return (
    <div className="flex bg-surface2 w-full">
      <Sidebar>{/* Sidebar content goes here */}</Sidebar>
      <div className="flex-1 flex flex-col">
        <Header
          title="Employees"
          buttonLabel="Add Employee"
          showButton={!!fileData}
          onButtonClick={() => {
            // Handle button click
          }}
        />
        <main className="w-full p-8 relative">{children}</main>
      </div>
    </div>
  )
}

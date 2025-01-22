'use client'
import { Employees } from './employees'

export default function EmployeesPage() {
  return (
    <div className="min-h-screen w-full flex flex-col p-8 bg-surface2 max-w-[1230px] mx-auto">
      <Employees />
    </div>
  )
}

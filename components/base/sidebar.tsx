import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SidebarProps {
  className?: string
  children?: React.ReactNode
}

export function Sidebar({ className, children }: SidebarProps) {
  return (
    <aside
      className={cn('w-[252px] bg-white border-r border-line z-30', className)}
    >
      <div className="h-[72px] px-6 flex items-center ">
        <Image
          src="/kelick-logo.svg"
          alt="Kelick Logo"
          width={105}
          height={25}
          priority
        />
      </div>
      {children}
    </aside>
  )
}

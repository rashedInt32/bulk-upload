import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  Building2,
  Users,
  DollarSign,
  Calendar,
  MoreHorizontal,
} from 'lucide-react'

const navigation = [
  {
    items: [
      {
        label: 'Dashboard',
        icon: HomeIcon,
        href: '/dashboard',
      },
    ],
  },
  {
    title: 'ORGANIZATION',
    items: [
      {
        label: 'Kelick',
        icon: Building2,
        href: '/organization',
      },
    ],
  },
  {
    title: 'MANAGE',
    items: [
      {
        label: 'Employees',
        icon: Users,
        href: '/',
      },
      {
        label: 'Payroll',
        icon: DollarSign,
        href: '/payroll',
      },
      {
        label: 'Leaves',
        icon: Calendar,
        href: '/leaves',
      },
      {
        label: 'Claims',
        icon: DollarSign,
        href: '/claims',
        iconClassName: 'rotate-180',
      },
      {
        label: 'More',
        icon: MoreHorizontal,
        href: '/more',
      },
    ],
  },
]

interface SidebarProps {
  className?: string
  children?: React.ReactNode
}

export function Sidebar({ className, children }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'w-[252px] bg-white border-r border-line z-30 flex flex-col h-screen',
        className
      )}
    >
      {/* Main content wrapper with flex-grow */}
      <div className="flex-grow flex flex-col">
        {/* Logo section */}
        <div className="h-[72px] px-6 flex items-center">
          <Image
            src="/kelick-logo.svg"
            alt="Kelick Logo"
            width={105}
            height={25}
            priority
          />
        </div>

        {/* Navigation section */}
        <div className="flex flex-col gap-6  px-3">
          {navigation.map((section, i) => (
            <div key={i} className="flex flex-col gap-1">
              <h3 className="text-grey-300 text-base font-bold px-3 mb-2">
                {section.title}
              </h3>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center text-base gap-3 px-3 py-2 rounded-lg text-grey-700 font-medium hover:bg-gray-100 transition-colors',
                    pathname === item.href &&
                      'bg-surface2 border font-bold border-line text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5 stroke-[1.5px] ',
                      item.iconClassName
                    )}
                  />
                  <span className="text-[15px]">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Children section at bottom */}
      {children && <div className="px-4 py-4 ">{children}</div>}
    </aside>
  )
}

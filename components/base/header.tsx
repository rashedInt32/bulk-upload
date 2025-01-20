import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
  buttonLabel?: string
  onButtonClick?: () => void
}

export function Header({ title, buttonLabel, onButtonClick }: HeaderProps) {
  return (
    <div className="h-[96px] px-6 border-b border-line bg-white flex items-center justify-between">
      <h1 className="text-[30px] font-bold leading-[38px] text-grey-900">
        {title}
      </h1>
      {buttonLabel && (
        <Button
          onClick={onButtonClick}
          size="default"
          className="font-semibold"
        >
          <Image
            src="/add-user-icon.svg"
            alt="Add User Icon"
            width={24}
            height={24}
          />
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const Sample = () => {
  return (
    <div className="w-full flex items-center justify-between mt-6 p-4 bg-grey-100 rounded-[12px] mb-2">
      <div className="flex items-center gap-3">
        <Image src="/excel-icon.svg" alt="Excel Icon" width={42} height={40} />
        <div className="flex flex-col">
          <h3 className="text-[14px] font-semibold mb-1">Table Example</h3>
          <p className="text-[12px] text-grey-400 font-medium text-balance">
            You can download the attached example and use them as a starting
            point for your own file.
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="gap-2">
        <Image
          src="/download-icon.svg"
          alt="Download Icon"
          width={16}
          height={16}
        />
        Download XLSX
      </Button>
    </div>
  )
}

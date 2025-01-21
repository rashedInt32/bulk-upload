'use client'
import Image from 'next/image'
import Lottie from 'lottie-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import successAnimation from '@/public/lottie.json'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onGeneratePayroll: () => void
}

export function SuccessModal({
  isOpen,
  onClose,
  onGeneratePayroll,
}: SuccessModalProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[425px] text-center px-8 pb-8 pt-6 rounded-[22px]"
          hideClose
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen">
            <Lottie
              animationData={successAnimation}
              loop={true}
              className="w-full h-full"
            />
          </div>
          <DialogHeader className="pt-8 flex flex-col items-center">
            <div className="mx-auto mb-6">
              <Image
                src="/check-circle.svg"
                alt="Success"
                width={80}
                height={80}
                priority
              />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Congrats! You've successfully added all your employees!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Would you like to generate payroll?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              I'll do it later
            </Button>
            <Button className="flex-1" onClick={onGeneratePayroll}>
              Generate Payroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lottie from 'lottie-react'
import { Modal } from '@/components/ui/modal'
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
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-[460px] text-center px-8 pb-8 pt-6 rounded-[22px]"
    >
      {!isAnimationComplete && (
        <div className="absolute top-[100px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen">
          <Lottie
            animationData={successAnimation}
            loop={false}
            className="w-full h-full"
            onComplete={() => setIsAnimationComplete(true)}
          />
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="mx-auto mb-6">
          <Image
            src="/check-circle.svg"
            alt="Success"
            width={80}
            height={80}
            priority
          />
        </div>
        <h2 className="text-[20px] font-bold text-grey-700 leading-[32px]">
          Congrats! You&apos;ve successfully added all your employees!
        </h2>
        <p className="text-grey-700 mt-3 text-[18px] font-medium">
          Would you like to generate payroll?
        </p>
      </div>

      <div className="flex flex-col w-full sm:flex-row gap-2 sm:gap-4 mt-8">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          I&apos;ll do it later
        </Button>
        <Button className="flex-1" onClick={onGeneratePayroll}>
          Generate Payroll
        </Button>
      </div>
    </Modal>
  )
}

'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export const EmptyEmployeeList = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex w-full items-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
        className="bg-white rounded-[16px] p-16 w-full border flex border-line flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.05,
            ease: 'easeOut',
          }}
        >
          <Image
            src="/team-icon.svg"
            alt="Team Building Icon"
            width={220}
            height={220}
            priority
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.1,
            ease: 'easeOut',
          }}
          className="text-[30px] font-bold leading-[38px] tracking-[-0.02em] text-center mb-2 text-primary-foreground"
        >
          Start building your team
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.15,
            ease: 'easeOut',
          }}
          className="text-grey-400 text-center mb-8 text-base"
        >
          Add your first team member or import your entire team
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.2,
            ease: 'easeOut',
          }}
          className="flex gap-4 w-full items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.25,
              ease: 'easeOut',
            }}
          >
            <Button variant="outline" onClick={onClick} className="gap-2">
              <Image
                src="/upload-icon.svg"
                alt="Upload Icon"
                width={20}
                height={20}
              />
              Bulk Upload
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.25,
              ease: 'easeOut',
            }}
          >
            <Button variant="default" className="gap-2">
              <Image
                src="/add-user-icon.svg"
                alt="Add User Icon"
                width={20}
                height={20}
              />
              Add Employee
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

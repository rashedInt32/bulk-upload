import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export const EmptyEmployeeList = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[16px] p-16 w-full max-w-[95%] border flex border-line flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[30px] font-bold leading-[38px] tracking-[-0.02em] text-center mt-6 mb-2 text-primary-foreground"
      >
        Start building your team
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-grey-400 text-center mb-8 text-base"
      >
        Add your first team member or import your entire team
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 w-full items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" onClick={onClick}>
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
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="default">
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
  )
}

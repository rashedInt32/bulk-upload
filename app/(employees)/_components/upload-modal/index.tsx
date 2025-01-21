import { AnimatePresence } from 'framer-motion'

import { motion } from 'framer-motion'
import { Modal } from '@/components/ui/modal'
import { Sample } from './sample'
import { UploadError } from './upload-error'
import { UploadModalProps } from '../../types'
import { Button } from '@/components/ui/button'

export const UploadModal = ({
  isOpen,
  error,
  isSubmitting,
  onClose,
  onContinue,
  children,
}: UploadModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload File">
      <motion.div
        className="flex flex-col items-center w-full"
        layout="preserve-aspect"
        layoutRoot
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {children}

        <Sample />
        <AnimatePresence mode="wait">
          {error && <UploadError type={error.type} text={error.text} />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="w-full flex justify-end gap-3 mt-8"
        >
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onContinue}
            disabled={isSubmitting}
          >
            Continue
          </Button>
        </motion.div>
      </motion.div>
    </Modal>
  )
}

import { AnimatePresence } from 'framer-motion'

import { motion } from 'framer-motion'
import { Modal } from '@/components/ui/modal'
import { Sample } from './sample'
import { UploadError } from './upload-error'
import { UploadModalProps } from '../../types'

export const UploadModal = ({
  isOpen,
  error,
  isSubmitting,
  onClose,
  onContinue,
  children,
  showFooter = true,
}: UploadModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload File"
      onContinue={onContinue}
      showFooter={showFooter}
      isSubmitting={isSubmitting}
    >
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
      </motion.div>
    </Modal>
  )
}

import { motion } from 'framer-motion'
import { TriangleAlert, Ruler, FileWarning } from 'lucide-react'

interface UploadErrorProps {
  type: string
  text: string
}

export const UploadError = ({ type, text }: UploadErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
        height: {
          duration: 0.2,
        },
      }}
      className="overflow-hidden w-full"
    >
      <p className="text-red-500 text-sm bg-red-500/10 w-full border border-red-500 p-2 px-4 rounded-lg font-bold flex items-center gap-3">
        {type === 'size' ? (
          <Ruler className="w-5 h-5" />
        ) : type === 'file' ? (
          <FileWarning className="w-5 h-5" />
        ) : (
          <TriangleAlert className="w-5 h-5" />
        )}
        {text}
      </p>
    </motion.div>
  )
}

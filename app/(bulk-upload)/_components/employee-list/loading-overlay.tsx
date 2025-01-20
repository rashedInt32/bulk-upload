import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 bg-surface2 flex items-center justify-center min-h-[130px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Loader2 className="h-[88px] w-[88px] text-primary animate-spin" />
      </motion.div>
    </motion.div>
  )
}

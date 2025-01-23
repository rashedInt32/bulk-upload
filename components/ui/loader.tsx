import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export const Loader = () => {
  return (
    <div className="absolute inset-0 w-full flex items-center justify-center z-50 min-h-[calc(100vh-100px)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Loader2 className="w-[88px] h-[88px] text-primary animate-spin" />
      </motion.div>
    </div>
  )
}

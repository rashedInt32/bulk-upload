import { FileX2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-16 bg-white rounded-[16px] border border-line"
    >
      <FileX2 className="w-12 h-12 text-grey-400 mb-4" />
      <p className="text-grey-900 text-base font-medium mb-1">
        No employees found
      </p>
      <p className="text-grey-400 text-sm">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </motion.div>
  )
}

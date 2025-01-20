import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface PaginationProps {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center justify-between px-4">
      <motion.div
        key={`${startIndex}-${endIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-grey-400"
      >
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{' '}
        {totalItems}
      </motion.div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-surface2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-grey-400" />
        </motion.button>

        <AnimatePresence mode="wait">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'hover:bg-surface2 text-grey-400'
              }`}
            >
              {page}
            </motion.button>
          ))}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-surface2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-grey-400" />
        </motion.button>
      </div>
    </div>
  )
}

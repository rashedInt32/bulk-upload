import { motion } from 'framer-motion'

export const UploadProgressBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-3 w-full"
    >
      <div className="w-full max-w-[183px] h-4 bg-fill rounded-[4px] overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-[4px]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </div>
      <p className="text-grey-300 text-[12px] text-center font-medium">
        Please wait while we upload your file...
      </p>
    </motion.div>
  )
}

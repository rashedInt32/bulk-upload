import Image from 'next/image'
import { motion } from 'framer-motion'

import { AnimatePresence } from 'framer-motion'
import { UploadProgressBar } from './upload-progress-bar'

interface DropzoneProps {
  isDragActive: boolean
  isSubmitting: boolean
  getRootProps: () => any
  getInputProps: () => any
  file: File | null
  removeFile: (e: React.MouseEvent) => void
  supportedFormats?: string[]
  maxFileSize?: number
}

export const Dropzone = ({
  isDragActive,
  isSubmitting,
  getRootProps,
  getInputProps,
  file,
  removeFile,
  supportedFormats = ['XLS', 'CSV'],
  maxFileSize = 25,
}: DropzoneProps) => {
  return (
    <>
      <div
        {...getRootProps()}
        className={`w-full min-h-[230px] rounded-[16px] flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-200 bg-surface2 border-dashed-custom
      ${isDragActive ? 'border-dashed-custom-active' : 'border-dashed-custom'}`}
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <UploadProgressBar />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <input {...getInputProps()} />
              <Image
                src="/upload-folder-icon.svg"
                alt="Upload Icon"
                width={72}
                height={72}
              />
              <div className="h-[42px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={isDragActive ? 'drag' : 'default'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="text-grey-300 text-[14px] text-center font-medium"
                  >
                    {isDragActive ? (
                      'Drop your file here'
                    ) : (
                      <>
                        Drag and drop your files here <br />
                        or{' '}
                        <span className="text-grey-300 font-bold underline hover:text-grey-300/90">
                          click to upload
                        </span>
                      </>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 bg-primary text-white px-3 pr-2 py-1.5 rounded-lg mt-4"
                >
                  <span className="text-sm">{file.name}</span>
                  <button
                    onClick={removeFile}
                    className="p-1 hover:bg-white/30 rounded-md bg-white/20 transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex justify-between mt-1 text-[12px] font-semibold text-grey-400">
        <span>Supported formats: {supportedFormats.join(', ')}</span>
        <span>Maximum file size: {maxFileSize}MB</span>
      </div>
    </>
  )
}

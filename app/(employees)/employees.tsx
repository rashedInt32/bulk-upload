'use client'
import { useState, useEffect } from 'react'
import { Dropzone } from './_components/dropzone'
import { UploadModal } from './_components/upload-modal'
import { EmptyEmployeeList } from './_components/empty-employee-list'
import { EmployeeList } from './_components/employee-list'
import { useFileUpload } from './_hooks/useFileUpload'
import { AnalyticsCard } from './_components/analytics-card'
import { useStore } from './_hooks/useStore'
import { SuccessModal } from './_components/success-modal'
import { motion } from 'framer-motion'
import { Loader } from '@/components/ui/loader'

export function Employees() {
  const { fileData } = useStore((state) => state)
  const {
    isModalOpen,
    setIsModalOpen,
    file,
    error,
    isSubmitting,
    isDragActive,
    getRootProps,
    getInputProps,
    removeFile,
    handleContinue,
    resetState,
  } = useFileUpload()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Show loading state and then success modal when fileData is loaded
  useEffect(() => {
    if (fileData && fileData.length > 0) {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false)
        setShowSuccess(true)
      }, 1000)
    }
  }, [fileData])

  const handleModalClose = () => {
    setIsModalOpen(false)
    resetState()
  }

  const handleGeneratePayroll = () => {
    // Handle payroll generation
    setShowSuccess(false)
  }

  if (isLoading) return <Loader />

  return (
    <>
      {fileData && fileData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-4 pb-8">
            <AnalyticsCard
              data={fileData}
              analyzeKey="Nationality"
              className="w-[275px]"
              chartType="circle"
            />
            <AnalyticsCard
              data={fileData}
              analyzeKey="Employment Type"
              className="w-2/5"
              chartType="line"
            />
            <AnalyticsCard
              data={fileData}
              analyzeKey="Status"
              className="flex-1"
              chartType="parabolic"
            />
          </div>
          <EmployeeList data={fileData} />
        </motion.div>
      ) : (
        <EmptyEmployeeList onClick={() => setIsModalOpen(true)} />
      )}

      <UploadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onContinue={handleContinue}
        showFooter={true}
        isSubmitting={isSubmitting}
        error={error}
      >
        <Dropzone
          isDragActive={isDragActive}
          isSubmitting={isSubmitting}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          file={file}
          removeFile={removeFile}
        />
      </UploadModal>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        onGeneratePayroll={handleGeneratePayroll}
      />
    </>
  )
}

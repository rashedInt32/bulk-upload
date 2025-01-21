'use client'
import { Dropzone } from './_components/dropzone'
import { UploadModal } from './_components/upload-modal'
import { EmptyEmployeeList } from './_components/empty-employee-list'
import { EmployeeList } from './_components/employee-list'
import { useFileUpload } from './_hooks/useFileUpload'
import { AnalyticsCard } from './_components/analytics-card'
import { useStore } from './_hooks/useStore'
import { SuccessModal } from './_components/success-modal'
import { useState, useEffect } from 'react'

export default function Employees() {
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
  const [showSuccess, setShowSuccess] = useState(true)

  // Show success modal when fileData is loaded
  useEffect(() => {
    if (fileData && fileData.length > 0) {
      setShowSuccess(true)
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

  return (
    <>
      {fileData && fileData.length > 0 ? (
        <>
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
        </>
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

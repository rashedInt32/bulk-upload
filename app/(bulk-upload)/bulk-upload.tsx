'use client'
import { Dropzone } from './_components/dropzone'
import { UploadModal } from './_components/upload-modal'
import { EmptyEmployeeList } from './_components/empty-employee-list'
import { EmployeeList } from './_components/employee-list'
import { useFileUpload } from './_hooks/useFileUpload'

export default function BulkUpload() {
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
    fileData,
  } = useFileUpload()

  const handleModalClose = () => {
    setIsModalOpen(false)
    resetState()
  }

  return (
    <>
      {fileData && fileData.length > 0 ? (
        <EmployeeList data={fileData} />
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
    </>
  )
}

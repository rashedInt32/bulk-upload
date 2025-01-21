export interface FileError {
  type: 'size' | 'file' | 'empty' | 'upload'
  text: string
}

export interface EmployeeData {
  'Employee ID': string
  'Employee Profile': string
  Email: string
  [key: string]: any // For additional fields
}

export interface FileUploadState {
  isModalOpen: boolean
  file: File | null
  error: FileError | null
  isSubmitting: boolean
}

export interface DropzoneProps {
  isDragActive: boolean
  isSubmitting: boolean
  getRootProps: () => any
  getInputProps: () => any
  file: File | null
  removeFile: (e: React.MouseEvent) => void
}

export interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => Promise<void>
  showFooter: boolean
  isSubmitting: boolean
  error: FileError | null
  children: React.ReactNode
}

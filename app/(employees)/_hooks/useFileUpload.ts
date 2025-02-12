'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { parseFile } from '../_utils/fileParser'
import { useStore } from './useStore'
import type { EmployeeData, FileUploadState } from '../types'

export function useFileUpload() {
  const { setFileData } = useStore((state) => state)
  const [state, setState] = useState<FileUploadState>({
    isModalOpen: false,
    file: null,
    error: null,
    isSubmitting: false,
  })

  const setPartialState = (partial: Partial<FileUploadState>) => {
    setState((prev) => ({ ...prev, ...partial }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setPartialState({ error: null })

    if (rejectedFiles.length > 0) {
      const rejectedFile = rejectedFiles[0]
      if (rejectedFile.file.size > 25 * 1024 * 1024) {
        setPartialState({
          error: { type: 'size', text: 'File size exceeds 25MB limit' },
          file: null,
        })
      } else {
        setPartialState({
          error: {
            type: 'file',
            text: 'Invalid file format. Please upload XLSX or CSV file',
          },
          file: null,
        })
      }
      return
    }

    const uploadedFile = acceptedFiles[0]
    if (uploadedFile) {
      setPartialState({ file: uploadedFile })
    }
  }, [])

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPartialState({
      file: null,
      error: null,
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 25 * 1024 * 1024,
  })

  const handleContinue = async () => {
    if (!state.file) {
      setPartialState({
        error: { type: 'empty', text: 'Please select a file to continue' },
      })
      return
    }

    try {
      setPartialState({
        isSubmitting: true,
        error: null,
      })

      const parsedData = await parseFile(state.file)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // On success
      setPartialState({
        isModalOpen: false,
        file: null,
      })

      setFileData(parsedData as EmployeeData[])
    } catch (err: unknown) {
      setPartialState({
        error: {
          type: 'upload',
          text:
            err instanceof Error
              ? err.message
              : 'Failed to process file. Please try again.',
        },
      })
    } finally {
      setPartialState({ isSubmitting: false })
    }
  }

  const resetState = () => {
    setPartialState({
      file: null,
      error: null,
    })
    setFileData(null)
  }

  return {
    ...state,
    setIsModalOpen: (isOpen: boolean) =>
      setPartialState({ isModalOpen: isOpen }),
    isDragActive,
    getRootProps,
    getInputProps,
    removeFile,
    handleContinue,
    resetState,
  }
}

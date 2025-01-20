import { useState } from 'react'
import { EmployeeData } from '../types'

interface UsePaginationProps {
  data: EmployeeData[]
  itemsPerPage: number
  onPageChange?: () => void
}

export function usePagination({
  data,
  itemsPerPage,
  onPageChange,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)

  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    setCurrentPage(page)
    onPageChange?.()
    setIsLoading(false)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    isLoading,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    resetPage,
  }
}

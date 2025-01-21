import { useState, useEffect } from 'react'
import { EmployeeData } from '../types'

export function useTableFilter(data: EmployeeData[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [filteredData, setFilteredData] = useState(data)

  // Get unique values for filters
  const uniqueStatuses = Array.from(new Set(data.map((item) => item.Status)))
  const uniqueRoles = Array.from(new Set(data.map((item) => item.Role)))

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter data when filters change
  useEffect(() => {
    const filterData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const filtered = data.filter((item) => {
        const matchesSearch =
          debouncedSearchQuery === '' ||
          Object.values(item).some((value) =>
            value
              ?.toString()
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
          )

        const matchesStatus =
          statusFilter === 'all' ||
          item.Status?.toLowerCase() === statusFilter.toLowerCase()

        const matchesRole =
          roleFilter === 'all' ||
          item.Role?.toLowerCase() === roleFilter.toLowerCase()

        return matchesSearch && matchesStatus && matchesRole
      })

      setFilteredData(filtered)
      setIsLoading(false)
    }

    filterData()
  }, [debouncedSearchQuery, statusFilter, roleFilter, data])

  const isFiltering =
    debouncedSearchQuery !== '' ||
    statusFilter !== 'all' ||
    roleFilter !== 'all'

  const handleReset = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setRoleFilter('all')
  }

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    isLoading,
    filteredData,
    uniqueStatuses,
    uniqueRoles,
    isFiltering,
    handleReset,
  }
}

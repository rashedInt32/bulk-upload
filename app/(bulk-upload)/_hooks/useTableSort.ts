import { useState } from 'react'
import { EmployeeData } from '../types'

type SortConfig = {
  key: keyof EmployeeData | null
  direction: 'asc' | 'desc' | null
}

export function useTableSort(initialData: EmployeeData[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  })

  const handleSort = (key: keyof EmployeeData) => {
    setSortConfig((current) => {
      if (current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' }
        if (current.direction === 'desc') return { key: null, direction: null }
      }
      return { key, direction: 'asc' }
    })
  }

  const sortedData = [...initialData].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue === bValue) return 0
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : 1
    } else {
      return aValue > bValue ? -1 : 1
    }
  })

  return {
    sortConfig,
    handleSort,
    sortedData,
  }
}

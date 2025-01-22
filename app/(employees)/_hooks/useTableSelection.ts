import { useState, useRef, useEffect } from 'react'
import { EmployeeData } from '../types'

export function useTableSelection(paginatedData: EmployeeData[]) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const headerCheckboxRef = useRef<HTMLInputElement>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedData.map((row) => row['Employee ID'].toString())
      setSelectedRows(new Set(pageIds))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) =>
      selectedRows.has(row['Employee ID'].toString())
    )

  const isSomeSelected = selectedRows.size > 0 && !isAllSelected

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeSelected
    }
  }, [isSomeSelected])

  const clearSelection = () => {
    setSelectedRows(new Set())
  }

  return {
    selectedRows,
    headerCheckboxRef,
    handleSelectAll,
    handleSelectRow,
    isAllSelected,
    isSomeSelected,
    clearSelection,
  }
}

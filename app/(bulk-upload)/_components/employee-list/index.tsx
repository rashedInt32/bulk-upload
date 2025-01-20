import { useState, useRef, useEffect } from 'react'
import { EmployeeData } from '../../types'
import { TABLE_COLUMNS } from '../../utils/tableConfig'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

interface EmployeeListProps {
  data: EmployeeData[]
}

type SortConfig = {
  key: keyof EmployeeData | null
  direction: 'asc' | 'desc' | null
}

export function EmployeeList({ data }: EmployeeListProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const itemsPerPage = 15
  const headerCheckboxRef = useRef<HTMLButtonElement>(null)

  // Get unique statuses and roles for filters
  const uniqueStatuses = Array.from(new Set(data.map((item) => item.Status)))
  const uniqueRoles = Array.from(new Set(data.map((item) => item.Role)))

  // Reset all filters
  const handleReset = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setRoleFilter('all')
    setCurrentPage(1)
  }

  // Show reset button only if any filter is active
  const isFiltering =
    searchQuery !== '' || statusFilter !== 'all' || roleFilter !== 'all'

  // Filter data based on search and filters
  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )

    const matchesStatus =
      statusFilter === 'all' ||
      item.Status?.toLowerCase() === statusFilter.toLowerCase()

    const matchesRole =
      roleFilter === 'all' ||
      item.Role?.toLowerCase() === roleFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesRole
  })

  // Sort filtered data
  const sortedData = [...filteredData].sort((a, b) => {
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

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Get current page data
  const paginatedData = sortedData.slice(startIndex, endIndex)

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedRows(new Set()) // Clear selection when changing pages
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

  // Selection handlers
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

  // Sorting logic
  const handleSort = (key: keyof EmployeeData) => {
    setSortConfig((current) => {
      if (current.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' }
        if (current.direction === 'desc') return { key: null, direction: null }
      }
      return { key, direction: 'asc' }
    })
  }

  const columns = TABLE_COLUMNS.map((column, index, array) => {
    if (column.key === 'select') {
      return {
        ...column,
        renderHeader: () => (
          <div className="flex items-center justify-center">
            <Checkbox
              ref={headerCheckboxRef}
              checked={isAllSelected}
              onCheckedChange={(checked) => handleSelectAll(!!checked)}
            />
          </div>
        ),
        render: (_: any, row: EmployeeData) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={selectedRows.has(row['Employee ID'].toString())}
              onCheckedChange={(checked) =>
                handleSelectRow(row['Employee ID'].toString(), !!checked)
              }
            />
          </div>
        ),
      }
    }
    return {
      ...column,
      renderHeader: () => (
        <button
          onClick={() => handleSort(column.key)}
          className={`flex items-center justify-between w-full hover:text-primary transition-colors ${
            index !== array.length - 1 ? 'pr-4' : ''
          }`}
        >
          <span className="text-grey-400 font-medium">{column.label}</span>
          <span className="text-grey-400 ml-2">
            {sortConfig.key === column.key ? (
              sortConfig.direction === 'asc' ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )
            ) : (
              <ChevronsUpDown className="w-5 h-5" />
            )}
          </span>
        </button>
      ),
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-[20px] font-bold leading-[25px]">
            All Employees
          </h2>
          {selectedRows.size > 0 && (
            <span className="text-sm text-gray-500">
              {selectedRows.size} selected
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-grey-400" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[280px] h-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueStatuses.map((status) => (
                <SelectItem key={status} value={status.toLowerCase()}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role.toLowerCase()}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isFiltering && (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="h-9 w-9 border-line rounded-[12px] hover:bg-surface2 hover:text-primary flex-shrink-0"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-[16px] overflow-hidden border border-line">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line bg-surface2">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="text-left py-4 text-base font-semibold last:pr-4 pl-[12px]"
                      style={{ width: column.width }}
                    >
                      {column.renderHeader
                        ? column.renderHeader()
                        : column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={row['Employee ID']}
                    className={`${
                      index !== paginatedData.length - 1
                        ? 'border-b border-line'
                        : ''
                    } transition-colors ${
                      selectedRows.has(row['Employee ID'].toString())
                        ? 'bg-primary/5'
                        : 'hover:bg-surface2/50'
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="py-4 max-w-0 last:pr-4 pl-[12px]"
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]?.toString() || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - now outside the table box */}
        <div className="flex items-center justify-between px-4">
          <div className="text-sm text-grey-400">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedData.length)} of{' '}
            {sortedData.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-surface2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-grey-400" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'hover:bg-surface2 text-grey-400'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-surface2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-grey-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

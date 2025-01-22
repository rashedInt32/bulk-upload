import { EmployeeData } from '../../types'
import { TABLE_COLUMNS } from '../../_utils/tableConfig'
import { AnimatePresence, motion } from 'framer-motion'
import { TableHeader } from './table-header'
import { TableComponent } from './table'
import { EmptyState } from './empty-state'
import { LoadingOverlay } from './loading-overlay'
import { Pagination } from './pagination'
import {
  useTableSelection,
  useTableSort,
  useTableFilter,
  usePagination,
} from '../../_hooks'

interface EmployeeListProps {
  data: EmployeeData[]
}

export function EmployeeList({ data }: EmployeeListProps) {
  // Filter hook
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    isLoading: isFilterLoading,
    filteredData,
    uniqueStatuses,
    uniqueRoles,
    isFiltering,
    handleReset,
  } = useTableFilter(data)

  // Sort hook
  const { sortConfig, handleSort, sortedData } = useTableSort(filteredData)

  // Pagination hook
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    isLoading: isPaginationLoading,
    handlePageChange,
  } = usePagination({
    data: sortedData,
    itemsPerPage: 15,
    onPageChange: () => {
      clearSelection() // Clear selection when page changes
    },
  })

  // Selection hook
  const {
    selectedRows,
    headerCheckboxRef,
    handleSelectAll,
    handleSelectRow,
    isAllSelected,
    clearSelection,
  } = useTableSelection(paginatedData)

  const isLoading = isFilterLoading || isPaginationLoading

  return (
    <div className="space-y-6 w-full">
      <TableHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        onReset={handleReset}
        uniqueStatuses={uniqueStatuses}
        uniqueRoles={uniqueRoles}
        selectedCount={selectedRows.size}
        isFiltering={isFiltering}
      />

      <AnimatePresence mode="wait">
        {filteredData.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-[16px] overflow-hidden border border-line min-h-[130px]">
              <div className="relative">
                <TableComponent
                  columns={TABLE_COLUMNS}
                  data={paginatedData}
                  selectedRows={selectedRows}
                  onSelectRow={handleSelectRow}
                  onSelectAll={handleSelectAll}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  headerCheckboxRef={
                    headerCheckboxRef as React.RefObject<HTMLButtonElement>
                  }
                  isAllSelected={isAllSelected}
                />

                <AnimatePresence>
                  {isLoading && <LoadingOverlay />}
                </AnimatePresence>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={sortedData.length}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { Checkbox } from '@/components/ui/checkbox'
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'
import { EmployeeData } from '../../types'

interface TableComponentProps {
  columns: {
    key: keyof EmployeeData
    label: string
    width?: string
    renderHeader?: () => React.ReactNode
    render?: (value: any, row: EmployeeData) => React.ReactNode
  }[]
  data: EmployeeData[]
  selectedRows: Set<string>
  onSelectRow: (id: string, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  sortConfig: {
    key: keyof EmployeeData | null
    direction: 'asc' | 'desc' | null
  }
  onSort: (key: keyof EmployeeData) => void
  headerCheckboxRef: React.RefObject<HTMLButtonElement>
  isAllSelected: boolean
}

export function TableComponent({
  columns,
  data,
  selectedRows,
  onSelectRow,
  onSelectAll,
  sortConfig,
  onSort,
  headerCheckboxRef,
  isAllSelected,
}: TableComponentProps) {
  const renderColumns = columns.map((column, index, array) => {
    if (column.key === 'select') {
      return {
        ...column,
        renderHeader: () => (
          <div className="flex items-center justify-center">
            <Checkbox
              ref={headerCheckboxRef}
              checked={isAllSelected}
              onCheckedChange={(checked) => onSelectAll(!!checked)}
            />
          </div>
        ),
        render: (_: any, row: EmployeeData) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={selectedRows.has(row['Employee ID'].toString())}
              onCheckedChange={(checked) =>
                onSelectRow(row['Employee ID'].toString(), !!checked)
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
          onClick={() => onSort(column.key)}
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-line bg-surface2">
            {renderColumns.map((column) => (
              <th
                key={column.key}
                className="text-left py-4 text-base font-semibold last:pr-4 pl-[12px]"
                style={{ width: column.width }}
              >
                {column.renderHeader ? column.renderHeader() : column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row['Employee ID']}
              className={`${
                index !== data.length - 1 ? 'border-b border-line' : ''
              } transition-colors ${
                selectedRows.has(row['Employee ID'].toString())
                  ? 'bg-primary/5'
                  : 'hover:bg-surface2/50'
              }`}
            >
              {renderColumns.map((column) => (
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
  )
}

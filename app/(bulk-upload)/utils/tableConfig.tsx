import { EmployeeData } from '../types'
import { Checkbox } from '@/components/ui/checkbox'

export interface TableColumn {
  key: keyof EmployeeData
  label: string
  width?: string
  render?: (value: any, row: EmployeeData) => React.ReactNode
  renderHeader?: () => React.ReactNode
}

export const TABLE_COLUMNS: TableColumn[] = [
  {
    key: 'select',
    label: '',
    width: '48px',
    renderHeader: () => (
      <div className="flex items-center justify-center">
        <Checkbox />
      </div>
    ),
    render: (_, row) => (
      <div className="flex items-center justify-center">
        <Checkbox />
      </div>
    ),
  },
  {
    key: 'Employee ID',
    label: 'Employee ID',
    width: '180px',
    render: (value) => (
      <a
        href="#"
        className="font-semibold text-primary underline hover:text-primary/80 text-sm"
        onClick={(e) => {
          e.preventDefault()
          console.log('Employee ID clicked:', value)
        }}
      >
        {value || '-'}
      </a>
    ),
  },
  {
    key: 'Employee Profile',
    label: 'Employee Profile',
    width: '250px',
    render: (value) => {
      if (!value) return '-'
      const initials = value
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()

      return (
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-grey-200 border border-line flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">{initials}</span>
          </div>
          <span className="font-semibold truncate text-sm text-grey-900">
            {value}
          </span>
        </div>
      )
    },
  },
  {
    key: 'Email',
    label: 'Email',
    width: '250px',
    render: (value) => (
      <span className="text-grey-900 truncate block text-sm font-semibold">
        {value || '-'}
      </span>
    ),
  },
  {
    key: 'Role',
    label: 'Role',
    width: '210px',
    render: (value) => (
      <span className="capitalize text-sm text-grey-900 font-semibold">
        {value || '-'}
      </span>
    ),
  },
  {
    key: 'Status',
    label: 'Status',
    width: '186px',
    render: (value) => {
      const status = value?.toLowerCase() || 'pending'
      const styles = {
        active: 'bg-primary/20 text-primary',
        'payroll only': 'bg-grey-200 text-grey-400',
        'invite sent': 'bg-purple-600/15 text-purple-600',
      }

      return (
        <span
          className={`px-2.5 py-1 pr-[12px] rounded-[12px] text-xs font-semibold capitalize inline-flex items-center gap-2 ${
            styles[status as keyof typeof styles] || styles['payroll only']
          }`}
        >
          <span
            className="hidden  w-2 h-2 rounded-full mx-1 xl:flex"
            style={{
              backgroundColor: 'currentColor',
            }}
          />
          {status}
        </span>
      )
    },
  },
]

/**
 * Extracts all possible columns from data and merges with default config
 */
export function getTableColumns(
  data: EmployeeData[],
  defaultColumns: TableColumn[] = TABLE_COLUMNS
): TableColumn[] {
  if (!data?.length) return defaultColumns

  // Get all unique keys from the data
  const dataKeys = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  )

  // Create columns array with visibility based on defaults
  return dataKeys.map((key) => {
    const defaultColumn = defaultColumns.find((col) => col.key === key)
    return {
      key: key as keyof EmployeeData,
      label: defaultColumn?.label || key.charAt(0).toUpperCase() + key.slice(1),
      width: defaultColumn?.width,
      render: defaultColumn?.render,
    }
  })
}

/**
 * Filters data based on visible columns
 */
export function filterTableData(
  data: EmployeeData[],
  columns: TableColumn[]
): Partial<EmployeeData>[] {
  const visibleColumns = columns.filter((col) => col.visible)

  return data.map((row) =>
    visibleColumns.reduce(
      (acc, col) => ({
        ...acc,
        [col.key]: row[col.key],
      }),
      {}
    )
  )
}

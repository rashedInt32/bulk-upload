import { Search, RotateCcw } from 'lucide-react'
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

interface TableHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  roleFilter: string
  onRoleChange: (value: string) => void
  onReset: () => void
  uniqueStatuses: string[]
  uniqueRoles: string[]
  selectedCount: number
  isFiltering: boolean
}

export function TableHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  roleFilter,
  onRoleChange,
  onReset,
  uniqueStatuses,
  uniqueRoles,
  selectedCount,
  isFiltering,
}: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-shrink-0">
        <h2 className="text-[20px] font-bold leading-[25px]">All Employees</h2>
        {selectedCount > 0 && (
          <span className="text-sm text-gray-500">
            {selectedCount} selected
          </span>
        )}
      </div>

      <div className="flex items-center relative flex-shrink-0">
        <motion.div
          animate={{
            x: isFiltering ? -54 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeInOut',
          }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-grey-400" />
            <Input
              placeholder="Search employee"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 w-[240px] h-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[auto] h-9 font-semibold">
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

          <Select value={roleFilter} onValueChange={onRoleChange}>
            <SelectTrigger className="w-[auto] h-9 font-semibold">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-semibold">
                All Roles
              </SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role.toLowerCase()}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <AnimatePresence>
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 ml-4"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={onReset}
                className="h-9 w-9 bg-white border-line hover:border-red-500 transition-colors"
              >
                <RotateCcw className="h-4 w-4 text-red-500" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

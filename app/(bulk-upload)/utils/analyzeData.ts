import { EmployeeData } from '../types'

interface ValueCount {
  value: string
  count: number
}

/**
 * Analyzes file data and returns count of unique values for a specific key
 * @param data Array of employee data objects
 * @param key Key to analyze (e.g., 'department', 'role', etc.)
 * @returns Array of objects containing value and its count, sorted by count
 */
export function analyzeDataByKey(
  data: EmployeeData[],
  key: keyof EmployeeData
): ValueCount[] {
  // Early return if no data
  if (!data?.length) return []

  // Count occurrences of each value
  const counts = data.reduce((acc, item) => {
    const value = String(item[key] || '').trim()
    if (!value) return acc // Skip empty values

    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Convert to array and sort by count (descending)
  const result = Object.entries(counts)
    .map(([value, count]) => ({
      value,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  return result
}

/**
 * Example usage:
 * const departments = analyzeDataByKey(fileData, 'department')
 * console.log(departments)
 * [
 *   { value: "Engineering", count: 10 },
 *   { value: "Marketing", count: 5 },
 *   { value: "Sales", count: 3 }
 * ]
 */

import * as XLSX from 'xlsx'
import { EmployeeData } from '../types'

export async function parseFile(file: File): Promise<EmployeeData[]> {
  // Check for empty file
  if (!file || file.size === 0) {
    throw new Error('File is empty')
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) {
          throw new Error('No data found in file')
        }

        let workbook: XLSX.WorkBook

        if (file.name.endsWith('.csv')) {
          // Handle CSV files
          const csvData = data as string
          if (!csvData.trim()) {
            throw new Error('CSV file is empty')
          }
          workbook = XLSX.read(csvData, { type: 'string' })
        } else {
          // Handle XLSX files
          const arrayBuffer = data as ArrayBuffer
          if (arrayBuffer.byteLength === 0) {
            throw new Error('Excel file is empty')
          }
          workbook = XLSX.read(arrayBuffer, { type: 'array' })
        }

        // Check if workbook has any sheets
        if (!workbook.SheetNames.length) {
          throw new Error('No sheets found in file')
        }

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]

        // Check if sheet has any data
        if (!firstSheet || Object.keys(firstSheet).length <= 1) {
          // Account for '!ref' property
          throw new Error('Sheet is empty')
        }

        const jsonData = XLSX.utils.sheet_to_json(firstSheet)

        // Check for empty parsed data
        if (!jsonData || jsonData.length === 0) {
          throw new Error('No data found in file')
        }

        // Validate required fields
        if (!validateEmployeeData(jsonData as EmployeeData[])) {
          throw new Error('Invalid file format. Missing required fields.')
        }

        resolve(jsonData as EmployeeData[])
      } catch (error) {
        reject(
          error instanceof Error ? error : new Error('Failed to parse file')
        )
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))

    // Read file based on type
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

/**
 * Validates that the parsed data has the required fields and is not empty
 */
function validateEmployeeData(data: EmployeeData[]): boolean {
  if (!Array.isArray(data) || data.length === 0) return false

  const requiredFields = ['Employee ID', 'Email', 'Employee Profile']
  const firstRow = data[0]

  // Check if any row is completely empty
  const hasEmptyRows = data.some((row) =>
    Object.values(row).every(
      (value) => value === null || value === undefined || value === ''
    )
  )

  if (hasEmptyRows) {
    throw new Error('File contains empty rows')
  }

  // Check for required fields
  const hasRequiredFields = requiredFields.every((field) =>
    Object.keys(firstRow).some((key) =>
      key.toLowerCase().includes(field.toLowerCase())
    )
  )

  if (!hasRequiredFields) {
    throw new Error(
      `Required fields missing. Please include: ${requiredFields.join(', ')}`
    )
  }

  return true
}

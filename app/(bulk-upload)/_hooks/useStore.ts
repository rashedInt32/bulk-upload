import { create } from 'zustand'

import { EmployeeData } from '../types'

interface FileStore {
  fileData: EmployeeData[] | null
  setFileData: (data: EmployeeData[] | null) => void
}

export const useStore = create<FileStore>((set) => ({
  fileData: null,
  setFileData: (data) => set({ fileData: data }),
}))

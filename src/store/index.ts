import { Row } from '@/types/row'
import { create } from 'zustand'

export const useStore = create<{ rows: Row[]; filteredRows: Row[] }>(() => ({
  rows: [],
  filteredRows: []
}))

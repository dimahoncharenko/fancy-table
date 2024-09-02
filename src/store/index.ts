import { Row } from '@/types/row'
import { create } from 'zustand'
import data from '@/data/rows.json'

const rows = data as Row[]

export const useStore = create<{ rows: Row[]; filteredRows: Row[] }>(() => ({
  rows,
  filteredRows: []
}))

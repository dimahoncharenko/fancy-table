import { ReadonlyURLSearchParams } from 'next/navigation'
import { describe, expect, test } from 'vitest'
import { SortState } from '@/components/Table/ui/TableHeader'
import {
  calculateParams,
  hasSorted,
  mapTextColors,
  removeParam
} from './row.helpers'

describe('Row Helpers', () => {
  test('calculateParams should concat a new search param', () => {
    const pageParams = new URLSearchParams(
      'page=1&sort=asc'
    ) as ReadonlyURLSearchParams

    const test1 = calculateParams(pageParams, 'sort', 'desc')
    expect(test1).toBe('?page=1&sort=desc')

    const test2 = calculateParams(pageParams, 'limit', '6')
    expect(test2).toBe('?page=1&sort=asc&limit=6')
  })

  test('removeParam should remove a search param correcly', () => {
    const pageParams = new URLSearchParams(
      'page=1&sort=asc'
    ) as ReadonlyURLSearchParams

    const test1 = removeParam(pageParams, 'sort')
    expect(test1).toBe('?page=1')

    const pageParams2 = new URLSearchParams('page=1') as ReadonlyURLSearchParams

    const test2 = removeParam(pageParams2, 'page')
    expect(test2).toBe('')
  })

  test('hasSorted should handle correctly', () => {
    let sortState: SortState = {
      Date: 'asc'
    }

    const test1 = hasSorted(sortState)
    expect(test1).toStrictEqual({
      'Product Name': {
        asc: false,
        desc: false
      },
      Customer: {
        asc: false,
        desc: false
      },
      Date: {
        asc: true,
        desc: false
      },
      Status: {
        asc: false,
        desc: false
      }
    })
  })

  test('mapTextColors should return correct colors', () => {
    const [cancelled, delivered, process] = ['#A30D11', '#1F9254', '#CD6200']

    expect(mapTextColors('Cancelled')).toBe(cancelled)
    expect(mapTextColors('Delivered')).toBe(delivered)
    expect(mapTextColors('Process')).toBe(process)
  })
})

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export const usePaginate = <T = any>(
  allItems: T[],
  paginationItemsLimit = 10
) => {
  const [paginated, setPaginated] = useState<T[]>([])
  const params = useSearchParams()
  const page = parseInt(params.get('page') || '1')

  const items = useMemo(() => allItems, [allItems])

  useEffect(() => {
    if (page === 1) {
      setPaginated(items.slice(0, paginationItemsLimit))
    } else {
      const startingIndex = paginationItemsLimit * page - 1
      setPaginated(
        items.slice(startingIndex, startingIndex + paginationItemsLimit)
      )
    }
  }, [items, page, paginationItemsLimit])

  return [page, { paginated, setPaginated, params }] as const
}

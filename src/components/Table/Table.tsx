import { useEffect, useState } from 'react'
import { Row as TRow } from '@/types/row'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePaginate } from '@/hooks/usePaginate'
import { calculateParams } from '@/helpers/row.helpers'
import { DarkModeButton } from '../DarkModeButton'
import { PaginationBar } from '../PaginationBar'
import { LimitSelect } from './ui/LimitSelect'
import { Row } from './ui/Row'
import { SearchRows } from './ui/SearchRows'
import { TableHeader } from './ui/TableHeader'
import rows from '@/data/rows.json'

export const Table = () => {
  const { data } = useQuery({
    queryKey: ['Rows'],
    queryFn: async () => {
      return rows as TRow[]
    }
  })

  const router = useRouter()
  const params = useSearchParams()

  const sortParam = params.get('sort')
  const searchParam = params.get('search')
  const limitParam = params.get('limit') || '10'

  const [displayedRows, setDisplayedRows] = useState<TRow[]>([])
  const [page, { paginated }] = usePaginate(displayedRows, Number(limitParam))

  useEffect(() => {
    if (data) {
      setDisplayedRows(() => data)
    }
  }, [data])

  useEffect(() => {
    if (sortParam) {
      const copy = displayedRows.slice(0)

      const [column, sorting] = sortParam.split('+')
      const columnName = column as keyof TRow

      copy.sort((a, b) => {
        if (a[columnName] < b[columnName]) {
          return sorting === 'asc' ? -1 : 1
        }
        if (a[columnName] > b[columnName]) {
          return sorting === 'asc' ? 1 : -1
        }
        return 0
      })

      setDisplayedRows(() => copy)
    }
  }, [sortParam])

  useEffect(() => {
    if (!data) return

    // If the user is doing the search, we need to navigate to the first page
    if (page !== 1) {
      router.replace(calculateParams(params, 'page', '1'))
    }

    if (searchParam && data) {
      setDisplayedRows(() =>
        data.filter(a =>
          a['Product Name'].toLowerCase().includes(searchParam.toLowerCase())
        )
      )
    } else {
      setDisplayedRows(data)
    }
  }, [searchParam, data])

  if (!data || !displayedRows) return null

  return (
    <>
      <div className='flex items-center gap-6 pl-4'>
        {/* Select items count per page */}
        <LimitSelect />

        {/* Search Field */}
        <SearchRows />

        <DarkModeButton />
      </div>

      <table
        data-testid='table'
        className='w-full'
      >
        <TableHeader />
        <tbody>
          {paginated.map((row, index) => (
            <Row
              classNames={{
                row: 'odd:bg-accent even:bg-white dark:odd:bg-blue dark:even:bg-blue-dark dark:text-white text-sm xl:test-basef'
              }}
              key={index}
              data={row}
            />
          ))}
        </tbody>
      </table>
      <div className='py-4'>
        <PaginationBar
          pages={Math.floor(displayedRows.length / Number(limitParam))}
        />
      </div>
    </>
  )
}

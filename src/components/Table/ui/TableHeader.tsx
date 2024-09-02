import { useEffect, useState } from 'react'
import { Row } from '@/types/row'
import { SquareChevronDown, SquareChevronUp } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { calculateParams, hasSorted, removeParam } from '@/helpers/row.helpers'
import { Th } from './Th'

export type SortState =
  | {
      [P in keyof Partial<Row>]: 'asc' | 'desc'
    }
  | null

export const TableHeader = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [sort, setSort] = useState<SortState>(null)

  useEffect(() => {
    if (sort) {
      for (let col in sort) {
        const columnName = col as keyof Row
        router.replace(
          calculateParams(params, 'sort', `${columnName}+${sort[columnName]}`)
        )
      }
    } else {
      router.replace(removeParam(params, 'sort'))
    }
  }, [sort])

  return (
    <thead data-testid='table-header'>
      <tr className='dark:text-white'>
        <Th
          className='whitespace-nowrap'
          data-testid='header-id'
        >
          Tracking ID
        </Th>
        <Th data-testid='header-product'>
          <div className='flex justify-between items-center'>
            <span>Product</span>
            <div className='flex flex-col'>
              <SquareChevronUp
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort)['Product Name'].asc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort)['Product Name'].asc
                    ? setSort(null)
                    : setSort(() => ({ 'Product Name': 'asc' }))
                }}
                data-testid='product-sort-asc'
              />
              <SquareChevronDown
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort)['Product Name'].desc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort)['Product Name'].desc
                    ? setSort(null)
                    : setSort(() => ({ 'Product Name': 'desc' }))
                }}
                data-testid='product-sort-desc'
              />
            </div>
          </div>
        </Th>
        <Th
          className='pr-0 min-w-[150px]'
          data-testid='header-customer'
        >
          <div className='flex justify-between items-center'>
            <span>Customer</span>
            <div className='flex flex-col'>
              <SquareChevronUp
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort).Customer.asc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort).Customer.asc
                    ? setSort(null)
                    : setSort(() => ({ Customer: 'asc' }))
                }}
                data-testid='customer-sort-asc'
              />
              <SquareChevronDown
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort).Customer.desc && 'text-accent-dark'
                )}
                onClick={() => {
                  setSort(() => ({ Customer: 'desc' }))
                }}
                data-testid='customer-sort-desc'
              />
            </div>
          </div>
        </Th>
        <Th
          className='pr-0 min-w-[115px]'
          data-testid='header-date'
        >
          <div className='flex justify-between items-center'>
            <span>Date</span>
            <div className='flex flex-col'>
              <SquareChevronUp
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort).Date.asc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort).Date.asc
                    ? setSort(null)
                    : setSort(() => ({ Date: 'asc' }))
                }}
                data-testid='date-sort-asc'
              />
              <SquareChevronDown
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort).Date.desc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort).Date.desc
                    ? setSort(null)
                    : setSort(() => ({ Date: 'desc' }))
                }}
                data-testid='date-sort-desc'
              />
            </div>
          </div>
        </Th>
        <Th
          className='mx-4'
          data-testid='header-amount'
        >
          Amount
        </Th>
        <Th
          className='whitespace-pre'
          data-testid='header-payment'
        >
          Payment Mode
        </Th>
        <Th
          className='pr-0 min-w-[115px]'
          data-testid='header-status'
        >
          <div className='flex justify-between items-center'>
            <span>Status</span>
            <div className='flex flex-col'>
              <SquareChevronUp
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort).Status.asc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort).Status.asc
                    ? setSort(null)
                    : setSort(() => ({ Status: 'asc' }))
                }}
                data-testid='status-sort-asc'
              />
              <SquareChevronDown
                size={14}
                className={cn(
                  'cursor-pointer',
                  hasSorted(sort).Status.desc && 'text-accent-dark'
                )}
                onClick={() => {
                  hasSorted(sort).Status.desc
                    ? setSort(null)
                    : setSort(() => ({ Status: 'desc' }))
                }}
                data-testid='status-sort-desc'
              />
            </div>
          </div>
        </Th>
      </tr>
    </thead>
  )
}

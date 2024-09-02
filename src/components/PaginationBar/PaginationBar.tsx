'use client'

import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { calculateParams } from '@/helpers/row.helpers'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'

type Props = {
  pages: number
  className?: string
}
export const PaginationBar = ({ pages, className }: Props) => {
  const params = useSearchParams()

  if (!pages) return null
  const currentPage = parseInt(params.get('page') || '1')

  // Generating pagination links
  const items: number[] = Array(pages)
    .fill(null)
    .reduce(
      acc => {
        // In case of last pages, add previous pages to the array (instead of a single last page, you see also the first page and three previous ones)
        if (
          // If it's the last one
          acc[acc.length - 1] === pages &&
          // And the array is less than 3 links
          acc.length < 5 &&
          // But also don't include 0 as a link
          acc[0] - 1 !== 0
        ) {
          acc.unshift(acc[0] - 1)
        }

        if (acc[acc.length - 1] + 1 > pages) return acc

        return acc.concat(acc[acc.length - 1] + 1)
      },
      [currentPage]
    )

  return (
    <>
      <Pagination
        className={cn(
          'justify-end xl:justify-center max-w-screen-sm',
          className
        )}
        data-testid='pagination-wrapper'
      >
        <PaginationContent
          className='gap-4'
          data-testid='pagination'
        >
          <PaginationItem>
            <PaginationPrevious
              className='mr-2'
              data-testid='pagination-prev'
              href={
                currentPage > 1
                  ? calculateParams(params, 'page', `${currentPage - 1}`)
                  : calculateParams(params, 'page', `${currentPage}`)
              }
            />
          </PaginationItem>
          {items.length <= 5 ? (
            <>
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === 1}
                  href={calculateParams(params, 'page', '1')}
                  data-testid='pagination-link'
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {items.map(page => {
                if (page === 1) return null

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      href={calculateParams(params, 'page', `${page}`)}
                      data-testid='pagination-link'
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
            </>
          ) : (
            // Last six pages
            <>
              {items[0] !== 1 && (
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === 1}
                    href={calculateParams(params, 'page', '1')}
                    data-testid='pagination-link'
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  isActive={items[0] === currentPage}
                  href={calculateParams(params, 'page', `${items[0]}`)}
                  data-testid='pagination-link'
                >
                  {items[0]}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  isActive={items[1] === currentPage}
                  href={calculateParams(params, 'page', `${items[1]}`)}
                  data-testid='pagination-link'
                >
                  {items[1]}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  isActive={items[2] === currentPage}
                  href={calculateParams(params, 'page', `${items[2]}`)}
                  data-testid='pagination-link'
                >
                  {items[2]}
                </PaginationLink>
              </PaginationItem>
              {currentPage === 1 && (
                <PaginationItem>
                  <PaginationLink
                    isActive={items[3] === currentPage}
                    href={calculateParams(params, 'page', `${items[3]}`)}
                    data-testid='pagination-link'
                  >
                    {items[3]}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationEllipsis data-testid='pagination-ellipsis' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  isActive={items[items.length - 1] === currentPage}
                  data-testid='pagination-link'
                  href={calculateParams(
                    params,
                    'page',
                    `${items[items.length - 1]}`
                  )}
                >
                  {items[items.length - 1]}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              className='-ml-2'
              data-testid='pagination-next'
              href={
                currentPage < pages
                  ? calculateParams(params, 'page', `${currentPage + 1}`)
                  : calculateParams(params, 'page', `${currentPage}`)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

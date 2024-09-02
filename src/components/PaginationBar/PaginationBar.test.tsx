import { render } from '@testing-library/react'
import * as next from 'next/navigation'
import { Mock, describe, expect, test, vi } from 'vitest'
import { PaginationBar } from './PaginationBar'

vi.mock('next/navigation')

const setup = (getMock?: Mock<any>) => {
  // @ts-ignore
  vi.spyOn(next, 'useSearchParams').mockImplementationOnce(() => ({
    get: getMock || vi.fn(),
    entries: vi.fn(),
    forEach: vi.fn(),
    getAll: vi.fn(),
    has: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    keys: vi.fn(),
    values: vi.fn(),
    toString: vi.fn(),
    size: 4
  }))
}

describe('PaginationBar', () => {
  test('should render correctly', () => {
    setup()

    const { getByTestId, getAllByTestId } = render(<PaginationBar pages={10} />)

    expect(getByTestId('pagination')).toBeInTheDocument()
    // Should be 3 first links, ellipsis, last link, prev button and next one
    const links = getAllByTestId('pagination-link')

    expect(getAllByTestId('pagination-link').length).toBe(5)
    expect(getByTestId('pagination-ellipsis')).toBeInTheDocument()
    expect(getByTestId('pagination-prev')).toBeInTheDocument()
    expect(getByTestId('pagination-next')).toBeInTheDocument()

    for (let i = 0; i < links.length - 1; i++) {
      expect(links[i].textContent).toBe(String(i + 1))
    }

    expect(links[links.length - 1].textContent).toBe('10')
  })

  test('should render last pages correctly', () => {
    setup(vi.fn().mockReturnValue('10'))

    const { getByTestId, getAllByTestId } = render(<PaginationBar pages={10} />)

    // Should be 5 last links, first page, prev button and next one
    const links = getAllByTestId('pagination-link')

    expect(links.length).toBe(6)
    expect(getByTestId('pagination-prev')).toBeInTheDocument()
    expect(getByTestId('pagination-next')).toBeInTheDocument()

    let lastPage = Number(links[links.length - 1].textContent)

    for (let i = links.length - 1; i > 1; i--, lastPage--) {
      expect(links[i].textContent).toBe(String(lastPage))
    }

    expect(links[0].textContent).toBe('1')
  })

  test('should render links correctly in the middle', () => {
    let selectedPage = 5

    setup(vi.fn().mockReturnValue(`${selectedPage}`))

    const { getByTestId, getAllByTestId } = render(<PaginationBar pages={10} />)

    // Should be 5 last links, first page, prev button and next one
    const links = getAllByTestId('pagination-link')
    expect(links.length).toBe(5)
    expect(getByTestId('pagination-ellipsis')).toBeInTheDocument()
    expect(getByTestId('pagination-prev')).toBeInTheDocument()
    expect(getByTestId('pagination-next')).toBeInTheDocument()

    expect(links[0]).toHaveTextContent('1')
    expect(links[1]).toHaveTextContent('5')
    expect(links[2]).toHaveTextContent('6')
    expect(links[3]).toHaveTextContent('7')
    expect(links[4]).toHaveTextContent('10')
  })

  test('should add a custom class name for the wrapper', () => {
    setup()

    const { getByTestId } = render(
      <PaginationBar
        pages={10}
        className='text-3xl'
      />
    )

    expect(getByTestId('pagination-wrapper')).toHaveClass('text-3xl')
  })
})

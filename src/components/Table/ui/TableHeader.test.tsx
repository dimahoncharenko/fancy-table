import { fireEvent, render } from '@testing-library/react'
import * as next from 'next/navigation'
import { useRouter } from 'next/router'
import { describe, expect, test, vi } from 'vitest'
import { TableHeader } from './TableHeader'

const testReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      replace: testReplace,
      query: '',
      asPath: '',
      push: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn()
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null)
    }
  },
  useSearchParams() {
    return {
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
      append: vi.fn(),
      getAll: vi.fn()
    }
  }
}))

const TestTableHeader = () => {
  return (
    <table>
      <TableHeader />
    </table>
  )
}

describe('TableHeader', () => {
  test('should render a table header', () => {
    const { getByTestId } = render(<TestTableHeader />)

    expect(getByTestId('table-header')).toBeInTheDocument()
  })

  test('should render all columns', () => {
    const { getByTestId } = render(<TestTableHeader />)

    expect(getByTestId('header-id')).toBeInTheDocument()
    expect(getByTestId('header-product')).toBeInTheDocument()
    expect(getByTestId('header-customer')).toBeInTheDocument()
    expect(getByTestId('header-date')).toBeInTheDocument()
    expect(getByTestId('header-amount')).toBeInTheDocument()
    expect(getByTestId('header-status')).toBeInTheDocument()
  })
})

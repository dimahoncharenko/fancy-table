import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { SearchRows } from './SearchRows'

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      replace: vi.fn(),
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

describe('SearchRows', () => {
  test('should render', () => {
    const { getByTestId } = render(<SearchRows />)

    expect(getByTestId('search-field')).toBeInTheDocument()
  })

  test("should change input's value when typing", async () => {
    const { getByTestId } = render(<SearchRows />)
    const input = getByTestId('search-field') as HTMLInputElement

    await user.type(input, 'Search')
    expect(input.value).toBe('Search')
  })
})

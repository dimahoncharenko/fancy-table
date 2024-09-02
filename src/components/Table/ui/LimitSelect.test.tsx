import { fireEvent, render } from '@testing-library/react'
import * as next from 'next/navigation'
import { describe, expect, test, vi } from 'vitest'
import { LimitSelect } from './LimitSelect'

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

const enterLimitParam = (page?: string) => {
  // @ts-ignore
  vi.spyOn(next, 'useSearchParams').mockImplementationOnce(() => ({
    get: vi.fn().mockReturnValue(page || '10'),
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

describe('LimitSelect', () => {
  test('should render', () => {
    const { getByRole } = render(<LimitSelect />)

    expect(getByRole('combobox')).toBeInTheDocument()
  })

  test('should show a correct default value', () => {
    const { getByTestId } = render(<LimitSelect />)

    expect(getByTestId('select-value')).toHaveTextContent('10')
  })

  test('should show a correct selected value', () => {
    enterLimitParam('30')
    const testReplace = vi.fn()

    vi.spyOn(next, 'useRouter').mockReturnValueOnce({
      replace: testReplace,
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      push: vi.fn(),
      refresh: vi.fn()
    })

    const { getByTestId, getByRole } = render(<LimitSelect />)

    expect(getByTestId('select-value')).toHaveTextContent('30')

    fireEvent.change(getByRole('combobox'), { target: { value: '20' } })
    expect(testReplace).toHaveBeenCalled()
  })
})

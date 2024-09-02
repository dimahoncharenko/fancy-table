import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Th } from './Th'

describe('Th', () => {
  {
    test('should render a th element', () => {
      const { container } = render(
        <table>
          <thead>
            <tr>
              <Th>Header</Th>
            </tr>
          </thead>
        </table>
      )
      expect(container.querySelector('th')).toBeInTheDocument()
    })
    test('should render child elements properly', () => {
      const { getByText } = render(
        <table>
          <thead>
            <tr>
              <Th>Header</Th>
            </tr>
          </thead>
        </table>
      )
      expect(getByText('Header')).toBeInTheDocument()
    })

    test('should apply a custom class name', () => {
      const { container } = render(
        <table>
          <thead>
            <tr>
              <Th className='text-3xl'>Header</Th>
            </tr>
          </thead>
        </table>
      )
      expect(container.querySelector('th.text-3xl')).toBeInTheDocument()
    })
  }
})

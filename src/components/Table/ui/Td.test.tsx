import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Td } from './Td'

describe('Td', () => {
  {
    test('should render a td element', () => {
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <Td>Header</Td>
            </tr>
          </tbody>
        </table>
      )
      expect(container.querySelector('td')).toBeInTheDocument()
    })
    test('should render child elements properly', () => {
      const { getByText } = render(
        <table>
          <tbody>
            <tr>
              <Td>Header</Td>
            </tr>
          </tbody>
        </table>
      )
      expect(getByText('Header')).toBeInTheDocument()
    })

    test('should apply a custom class name', () => {
      const { container } = render(
        <table>
          <tbody>
            <tr>
              <Td className='text-3xl'>Header</Td>
            </tr>
          </tbody>
        </table>
      )
      expect(container.querySelector('td.text-3xl')).toBeInTheDocument()
    })
  }
})

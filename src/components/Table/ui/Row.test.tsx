import { Row as TRow } from '@/types/row'
import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, test } from 'vitest'
import { Row } from './Row'
import type { Props } from './Row'

const TestRow = (props: Props) => {
  return (
    <table>
      <tbody>
        <Row {...props} />
      </tbody>
    </table>
  )
}

const testData: TRow = {
  'Tracking ID': 146676,
  'Payment Mode': 'Bank Transfer',
  'Product Image': 'https://placehold.io/640x640.png',
  'Product Name': 'Handcrafted Steel Plate',
  Amount: 335.37,
  Customer: 'Joshua Waters',
  Date: '2023-06-03',
  Status: 'Delivered'
}

describe('Row', () => {
  test('should render', () => {
    const { getByTestId } = render(<TestRow data={testData} />)

    expect(getByTestId('row')).toBeInTheDocument()
  })

  test('should render all fields correctly', () => {
    const { getByTestId } = render(<TestRow data={testData} />)

    // Match the row's id
    expect(getByTestId('row-id')).toHaveTextContent(
      `#${testData['Tracking ID']}`
    )

    // Match the product image
    expect(getByTestId('row-image').getAttribute('src')).toMatch(
      encodeURIComponent(testData['Product Image'])
    )

    // Match the product name
    expect(getByTestId('row-product-name')).toHaveTextContent(
      testData['Product Name']
    )

    // Match the customer
    expect(getByTestId('row-customer')).toHaveTextContent(testData.Customer)

    // Match the date
    expect(getByTestId('row-date')).toHaveTextContent('03/06/2023')

    // Match the amount
    expect(getByTestId('row-amount')).toHaveTextContent(`$${testData.Amount}`)

    // Match the payment mode
    expect(getByTestId('row-payment')).toHaveTextContent(
      testData['Payment Mode']
    )

    // Match the status
    const badge = getByTestId('badge')
    expect(badge).toHaveTextContent(testData.Status)
    expect(badge).toHaveStyle('background-color: #EBF9F1')
  })

  test('should apply a provided class name', () => {
    const { getByTestId } = render(
      <TestRow
        data={testData}
        classNames={{ row: 'text-2xl' }}
      />
    )

    expect(getByTestId('row')).toHaveClass('text-2xl')
  })
})

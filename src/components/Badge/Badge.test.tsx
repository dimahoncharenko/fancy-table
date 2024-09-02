import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Badge } from './Badge'

const testPalette = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  orange: 'orange',
  pink: 'pink'
}

describe('Badge', () => {
  test('should render', () => {
    const { getByTestId } = render(
      <Badge
        palette={testPalette}
        color='red'
      />
    )

    expect(getByTestId('badge')).toBeInTheDocument()
  })

  test('should show correct badge color', () => {
    const { getByTestId } = render(
      <Badge
        palette={testPalette}
        color='red'
      >
        Red
      </Badge>
    )

    // Tailwind css converts keywords to rgb values
    expect(getByTestId('badge')).toHaveStyle('background-color: rgb(255, 0, 0)')
  })

  test('should show badge with custom children', () => {
    const { getByTestId } = render(
      <Badge
        palette={testPalette}
        color='red'
      >
        <span data-testid='childnode'>Custom children</span>
      </Badge>
    )

    expect(getByTestId('childnode')).toBeInTheDocument()
  })
})

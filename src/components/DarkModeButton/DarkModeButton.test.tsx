import { fireEvent, render, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { DarkModeButton } from './DarkModeButton'
import { ColorSchemeProvider } from '@/context/colorScheme.context'

describe('DarkModeButton', () => {
  test('should render', () => {
    const { getByRole } = render(<DarkModeButton />)
    expect(getByRole('switch')).toBeInTheDocument()
  })

  test('should toggle dark mode', async () => {
    const { getByRole } = render(
      <ColorSchemeProvider>
        <DarkModeButton />
      </ColorSchemeProvider>
    )
    const switchElement = getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')

    await waitFor(() => {
      fireEvent.click(switchElement)
    })

    expect(switchElement).toHaveAttribute('aria-checked', 'true')
  })
})

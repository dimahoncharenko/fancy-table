'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react'
import { Keys } from '@/constants/localstorage.const'

type ColorSchemeContext = {
  scheme: 'dark' | 'light'
  setScheme: Dispatch<SetStateAction<'dark' | 'light'>>
}

export const colorSchemeContext = createContext({} as ColorSchemeContext)

type ColorSchemeProviderProps = {
  children: React.ReactNode
}
export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [scheme, setScheme] = useState<ColorSchemeContext['scheme']>('light')

  useEffect(() => {
    if (!localStorage.getItem(Keys.COLOR_SCHEME)) {
      const mode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      localStorage.setItem(Keys.COLOR_SCHEME, mode)
      setScheme(mode)
    } else {
      setScheme(
        localStorage.getItem(Keys.COLOR_SCHEME) as ColorSchemeContext['scheme']
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(Keys.COLOR_SCHEME, scheme)
  }, [scheme])

  return (
    <colorSchemeContext.Provider value={{ scheme, setScheme }}>
      {children}
    </colorSchemeContext.Provider>
  )
}

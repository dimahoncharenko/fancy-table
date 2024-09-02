'use client'

import { useContext, useLayoutEffect } from 'react'
import { colorSchemeContext } from '@/context/colorScheme.context'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { scheme } = useContext(colorSchemeContext)

  useLayoutEffect(() => {
    if (scheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [scheme])

  return <>{children}</>
}

'use client'

import { useContext, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Keys } from '@/constants/localstorage.const'
import { colorSchemeContext } from '@/context/colorScheme.context'

export const DarkModeButton = () => {
  const { setScheme } = useContext(colorSchemeContext)

  useEffect(() => {
    const colorScheme = localStorage.getItem(Keys.COLOR_SCHEME)
    setScheme(!colorScheme || colorScheme === 'light' ? 'light' : 'dark')
  }, [])

  return (
    <>
      <Switch
        title='Enable dark mode'
        onCheckedChange={val => setScheme(val ? 'dark' : 'light')}
      />
      <span>Dark Mode</span>
    </>
  )
}

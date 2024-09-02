'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ColorSchemeProvider } from '@/context/colorScheme.context'

export const Providers = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    })
  )

  return (
    <QueryClientProvider client={client}>
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

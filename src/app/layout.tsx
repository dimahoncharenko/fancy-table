import { Suspense } from 'react'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { SITE_NAME } from '@/constants/seo.const'
import { montserrat } from './fonts'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: ''
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen antialiased bg-white dark:bg-blue-dark',
          montserrat.variable,
          montserrat.className
        )}
      >
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}

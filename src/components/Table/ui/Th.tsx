import { DetailedHTMLProps, ThHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = DetailedHTMLProps<
  ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  children: React.ReactNode
}

export const Th = ({ children, className, ...props }: Props) => {
  return (
    <th
      {...props}
      className={cn('p-4', className)}
    >
      {children}
    </th>
  )
}

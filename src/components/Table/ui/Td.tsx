import { DetailedHTMLProps, TdHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  children: React.ReactNode
}

export const Td = ({ children, ...props }: Props) => (
  <td {...props}>{children}</td>
)

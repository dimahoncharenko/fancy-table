type Props = {
  palette: { [P in string]: string }
  color: string
  children?: React.ReactNode
}

export const Badge = ({ color, palette, children }: Props) => {
  const backgroundColor = color in palette ? palette[color] : 'gray'

  return (
    <div
      className='py-2 px-3 rounded-2.5xl flex justify-center'
      style={{
        backgroundColor
      }}
      data-testid='badge'
    >
      {children}
    </div>
  )
}

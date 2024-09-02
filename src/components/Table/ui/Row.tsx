import { Row as TRow } from '@/types/row'
import dayjs from 'dayjs'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/Badge'
import { cn } from '@/lib/utils'
import { mapTextColors } from '@/helpers/row.helpers'
import { Td } from './Td'

export type Props = {
  data: TRow
  handleDelete: (id: number) => void
  classNames?: {
    row?: string
  }
}

export const Row = ({ data, classNames, handleDelete }: Props) => {
  return (
    <tr
      className={cn(classNames?.row)}
      data-testid='row'
    >
      <Td
        data-testid='row-id'
        className='p-4'
      >
        #{data['Tracking ID']}
      </Td>
      <Td className='flex items-center gap-2 min-h-14 max-w-min'>
        <Image
          src={data['Product Image']}
          width={32}
          height={32}
          alt={data['Product Name']}
          sizes='100vw'
          className='object-cover rounded-lg aspect-square'
          data-testid='row-image'
        />
        <span
          title={data['Product Name']}
          className='w-[150px] md:w-[300px] xl:w-[400px] overflow-hidden whitespace-pre text-ellipsis'
          data-testid='row-product-name'
        >
          {data['Product Name']}
        </span>
      </Td>
      <Td data-testid='row-customer'>{data.Customer}</Td>
      <Td data-testid='row-date'>{dayjs(data['Date']).format('DD/MM/YYYY')}</Td>
      <Td data-testid='row-amount'>${data.Amount}</Td>
      <Td data-testid='row-payment'>{data['Payment Mode']}</Td>
      <Td>
        <Badge
          palette={{
            Process: '#FEF2E5',
            Delivered: '#EBF9F1',
            Cancelled: '#FBE7E8'
          }}
          color={data.Status}
        >
          <span
            className='text-xs'
            data-testid='row-status'
            style={{
              color: mapTextColors(data.Status)
            }}
          >
            {data.Status}
          </span>
        </Badge>
      </Td>
      <Td className='justify-center flex'>
        <Trash2
          className='text-danger cursor-pointer'
          size={24}
          onClick={() => handleDelete(data['Tracking ID'])}
        />
      </Td>
    </tr>
  )
}

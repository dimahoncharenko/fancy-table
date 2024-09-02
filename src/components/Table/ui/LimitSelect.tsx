import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { calculateParams, removeParam } from '@/helpers/row.helpers'

export const LimitSelect = () => {
  const router = useRouter()
  const params = useSearchParams()
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(params.get('limit')) || 10
  )

  useEffect(() => {
    if (itemsPerPage) {
      router.replace(
        removeParam(
          new URLSearchParams(
            calculateParams(params, 'limit', `${itemsPerPage}`)
          ),
          'page'
        )
      )
    }
  }, [itemsPerPage])

  return (
    <div className='flex items-center text-xs dark:text-white'>
      <span>Show</span>
      <Select
        onValueChange={(value: string) => {
          setItemsPerPage(+value)
        }}
      >
        <SelectTrigger className='max-w-11 max-h-8 mx-3 p-2 text-xs bg-gray-light dark:bg-blue-darker border-0 rounded-lg'>
          <SelectValue
            data-testid='select-value'
            placeholder={itemsPerPage}
          />
        </SelectTrigger>
        <SelectContent className='max-w-12'>
          <SelectItem value='10'>10</SelectItem>
          <SelectItem value='20'>20</SelectItem>
          <SelectItem value='30'>30</SelectItem>
          <SelectItem value='40'>40</SelectItem>
          <SelectItem value='50'>50</SelectItem>
        </SelectContent>
      </Select>
      <span>entries</span>
    </div>
  )
}

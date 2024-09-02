import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { calculateParams, removeParam } from '@/helpers/row.helpers'

export const SearchRows = () => {
  const params = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) {
      router.replace(calculateParams(params, 'search', search))
    } else {
      router.replace(removeParam(params, 'search'))
    }
  }, [search])

  return (
    <div className='flex items-center text-gray dark:text-white bg-white dark:bg-opacity-0 rounded-lg border border-gray dark:border-white px-2'>
      <Search size={16} />
      <Input
        data-testid='search-field'
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder='Search...'
        className='min-w-[218px] max-h-[32px] py-0 bg-opacity-0 focus-visible:-ring-2 border-0 outline-none text-xs placeholder:text-xs dark:placeholder:text-white'
      />
    </div>
  )
}

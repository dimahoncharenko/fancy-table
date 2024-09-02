import { Row, Status } from '@/types/row'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { SortState } from '@/components/Table/ui/TableHeader'

export const mapTextColors = (status: Status) => {
  switch (status) {
    case 'Cancelled':
      return '#A30D11'
    case 'Delivered':
      return '#1F9254'
    case 'Process':
      return '#CD6200'
  }
}

export const hasSorted = (sort: SortState) => {
  let results: {
    [P in keyof Pick<Row, 'Product Name' | 'Customer' | 'Date' | 'Status'>]: {
      asc: boolean
      desc: boolean
    }
  } = {
    'Product Name': {
      asc: false,
      desc: false
    },
    Customer: {
      asc: false,
      desc: false
    },
    Date: {
      asc: false,
      desc: false
    },
    Status: {
      asc: false,
      desc: false
    }
  }

  if (sort && 'Product Name' in sort && sort['Product Name'] === 'asc') {
    results['Product Name'] = {
      asc: true,
      desc: false
    }
  } else if (
    sort &&
    'Product Name' in sort &&
    sort['Product Name'] === 'desc'
  ) {
    results['Product Name'] = {
      asc: false,
      desc: true
    }
  } else if (sort?.Customer === 'asc') {
    results['Customer'] = {
      asc: true,
      desc: false
    }
  } else if (sort?.Customer === 'desc') {
    results['Customer'] = {
      asc: false,
      desc: true
    }
  } else if (sort?.Date === 'asc') {
    results['Date'] = {
      asc: true,
      desc: false
    }
  } else if (sort?.Date === 'desc') {
    results['Date'] = {
      asc: false,
      desc: true
    }
  } else if (sort?.Status === 'asc') {
    results['Status'] = {
      asc: true,
      desc: false
    }
  } else if (sort?.Status === 'desc') {
    results['Status'] = {
      asc: false,
      desc: true
    }
  }

  return results
}

export const calculateParams = (
  pageParams: ReadonlyURLSearchParams | URLSearchParams,
  key: string,
  value: string
) => {
  const params = new URLSearchParams(pageParams)
  params.set(key, value)

  return '?' + params.toString()
}

export const removeParam = (
  pageParams: ReadonlyURLSearchParams | URLSearchParams,
  key: string
) => {
  const newParams = new URLSearchParams(pageParams)
  newParams.delete(key)

  newParams.size

  return (!!newParams.size ? '?' : '') + newParams.toString()
}

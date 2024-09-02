export type PaymentMode =
  | 'Debit Card'
  | 'Cash on Delivery'
  | 'Bank Transfer'
  | 'Credit Card'
  | 'Paypal'
export type Status = 'Process' | 'Delivered' | 'Cancelled'

export type Row = {
  'Tracking ID': number
  'Product Image': string
  'Product Name': string
  Customer: string
  Date: string
  Amount: number
  'Payment Mode': PaymentMode
  Status: Status
}

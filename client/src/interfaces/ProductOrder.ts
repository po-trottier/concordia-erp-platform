export interface ProductOrder {
  dateOrdered: string,
  dateDue: string,
  amountDue: number,
  isPaid: string,
  details?: React.ReactNode
}

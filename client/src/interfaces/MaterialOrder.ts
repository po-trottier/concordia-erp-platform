export interface MaterialOrder {
  dateOrdered : string,
  dateDue : string,
  amountDue : number,
  isPaid : string,
  supplierName : string,
  details?: React.ReactNode,
}

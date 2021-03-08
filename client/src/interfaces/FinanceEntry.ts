export interface FinanceEntry {
  dateEntered : string,
  dateDue : string,
  amount : number,
  paid : number,
  companyName : string,
  balance? : number
}

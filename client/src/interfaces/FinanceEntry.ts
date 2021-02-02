export interface FinanceEntry {
  date : string,
  dateDue : string,
  billed : number,
  paid : number,
  buyer : string,
  balance? : number
}

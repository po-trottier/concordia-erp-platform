export interface ProductEntry {
  id : string,
  name : string,
  price : number,
  quantity : number,
  parts : { partId : string, quantity : number }[],
  properties : { key : string, value : number }[],
  build? : React.ReactNode
  details? : React.ReactNode
  actions? : React.ReactNode
}

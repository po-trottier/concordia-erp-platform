import React from 'react';

export interface ProductEntry {
  id : string,
  name : string,
  price : number,
  stock : number,
  parts : { partId : string, quantity : number }[],
  properties : { key : string, value : number }[],
  build? : React.ReactNode,
  details? : React.ReactNode,
  actions? : React.ReactNode,
}

import React from 'react';

export interface MaterialEntry {
  id : string,
  name : string,
  stock : number,
  density : number,
  vendorName : string,
  image : string,
  price : number,
  quantity : number,
  imageNode? : React.ReactNode,
  order? : React.ReactNode,
  actions? : React.ReactNode,
}
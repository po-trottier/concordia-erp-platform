import { ReactNode } from 'react';

export interface MaterialsListEntry {
  name : string,
  stock : number,
  density : string,
  price : number,
  vendor: string,
  img : ReactNode,
  actions?: ReactNode,
}

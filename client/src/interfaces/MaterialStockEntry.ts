import { MaterialEntry } from './MaterialEntry';

export interface MaterialStockEntry {
  materialId : MaterialEntry,
  locationId : string,
  stock : number,
}
import React from 'react';

export interface PartEntry {
  id : string,
  name : string,
  quantity : number,
  materials : { materialId : string, quantity : number }[],
  materialsString? : string | React.ReactNode,
  build? : React.ReactNode,
  actions? : React.ReactNode,
}
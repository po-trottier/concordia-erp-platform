import React from 'react';

export interface CustomerEntry {
  _id : string,
  name : string,
  email : string,
  balance? : number,
  paid? : number,
  items? : number,
  actions? : React.ReactNode,
}

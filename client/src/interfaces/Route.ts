import * as React from 'react';
import { Role } from '../router/Roles';

export interface Route {
  path : string,
  exact : boolean,
  title : string,
  icon : string,
  page : React.ComponentType<any>,
  auth : Role[]
}
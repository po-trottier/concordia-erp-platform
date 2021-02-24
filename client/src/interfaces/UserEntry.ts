import React from 'react';

export interface UserEntry {
  username : string,
  firstName: string,
  lastName: string,
  role: number,
  roleString?: string,
  email?: string,
  actions?: React.ReactNode
}
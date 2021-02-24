import React from 'react';

export interface UserEntry {
  username : string,
  firstName: string,
  lastName: string,
  role: number,
  email: string,
  roleString?: string,
  actions?: React.ReactNode
}
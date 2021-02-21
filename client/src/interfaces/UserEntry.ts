import React from 'react';

export interface UserEntry {
  username : string,
  name: string,
  role: number,
  roleString?: string,
  email?: string,
  actions?: React.ReactNode
}
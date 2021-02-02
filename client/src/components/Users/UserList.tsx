import React from 'react';

import { ResponsiveTable } from '../ResponsiveTable';
import { UserEntry } from '../../interfaces/UserEntry';

export const UserList = () => {

  const getColumns = () => ({
    name: 'Name',
    age: 'Age',
    location: 'Location',
    actions: 'Actions'
  });

  const getRows = (): UserEntry[] => {
    const users = [
      {
        name: 'Pierre-Olivier Trottier',
        age: 23,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Camil Bouzidi',
        age: 24,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Radley Carpio',
        age: 23,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Bicher Chammaa',
        age: 25,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Matthew Kevork',
        age: 24,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Cedric Martens',
        age: 22,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'William Morin-Laberge',
        age: 32,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Adrien Tremblay',
        age: 23,
        location: 'Montreal, Qc, Canada'
      },
      {
        name: 'Nimit Jaggi',
        age: 26,
        location: 'Montreal, Qc, Canada'
      },
    ];
    users.forEach((user: any) => {
      user.actions = (
        <div>
          <a href='?'>Reset Password</a>
          <br />
          <a href='?'>Delete User</a>
        </div>
      );
    });
    return users;
  };

  return (
    <ResponsiveTable rows={getRows()} cols={getColumns()} />
  );
};

import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { UserEntry } from '../../interfaces/UserEntry';

const { Search } = Input;

export const UserList = () => {

  const getColumns = () => ({
    name: 'Name',
    age: 'Age',
    location: 'Location',
    actions: 'Actions'
  });

  const getRows = () : UserEntry[] => {
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
    users.forEach((user : any) => {
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

  const [tableData, setTableData] = useState(getRows());
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = getRows();
    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    setTableData(rows);
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Card>
      <Search
        placeholder='Search for a customer'
        onChange={onSearch}
        style={{ marginBottom: 18 }} />
      <ResponsiveTable rows={tableData} cols={getColumns()} />
    </Card>
  );
};

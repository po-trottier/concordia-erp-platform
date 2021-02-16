import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { UserEntry } from '../../interfaces/UserEntry';
import axios from 'axios';

const { Search } = Input;

export const UserList = () => {

  const getColumns = () => ({
    name: 'Name',
    age: 'Username',
    actions: 'Actions'
  });

  // todo: Should use current user's token
  axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5TbWl0aDE5NjUiLCJpZCI6IjYwMmMzN2ZjNTMzMGM2NDQwNzdlNmVlZSIsInJvbGVzIjo0LCJpYXQiOjE2MTM1MTA3NzEsImV4cCI6MTY0NTA0Njc3MX0.xZkFNVbyAls43uga3IcAYT3JA9yVZc267_k6--NYw4g'}

  axios.get('http://localhost:5500/api/users')
  .then(response => console.log(response.data));

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
        placeholder='Search for a user'
        onChange={onSearch}
        style={{ marginBottom: 18 }} />
      <ResponsiveTable rows={tableData} cols={getColumns()} />
    </Card>
  );
};

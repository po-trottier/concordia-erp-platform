import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { UserEntry } from '../../interfaces/UserEntry';
import axios from '../../plugins/Axios'

const { Search } = Input;

export const UserList = () => {

  const getColumns = () => ({
    name: 'Name',
    age: 'Username',
    email: 'Email',
    role: 'Role',
    actions: 'Actions'
  });

  // todo: Should use current user's token
  axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5TbWl0aDE5NjUiLCJpZCI6IjYwMmMzN2ZjNTMzMGM2NDQwNzdlNmVlZSIsInJvbGVzIjo0LCJpYXQiOjE2MTM1MTA3NzEsImV4cCI6MTY0NTA0Njc3MX0.xZkFNVbyAls43uga3IcAYT3JA9yVZc267_k6--NYw4g'}

  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = [];
    axios.get('users').then(({data}) => {
      rows = data;
      if (searchValue.trim() !== '') {
        rows = rows.filter(
           (r : any) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
      }
      rows.forEach((user : any) => {
        user.email = "temp@gmail.com"
        user.actions = (
          <div>
            <a href='?'>Reset Password</a>
            <br />
            <a href='?'>Delete User</a>
          </div>
        );
      })
      setTableData([]);
    });

    }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Card>
      {tableData.length > 0 ? 
        <div>
          <Search
            placeholder='Search for a user'
            onChange={onSearch}
            style={{ marginBottom: 18 }} />
          <ResponsiveTable rows={tableData} cols={getColumns()} />
        </div>
        : 
        <div>No users have been found.</div>
      }
    </Card>
  );
};

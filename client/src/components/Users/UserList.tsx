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


  const getRows = () : Promise<UserEntry[]> => {
    const users = [];
    const response = await axios.get('http://localhost:5500/api/users')
    response.data.forEach((user : any) => {
        let u : UserEntry;
        u.name = user.name;
        u.username = user.username;
        u.role = user.role;
        u.email = 'temp@gmail.com'; // todo: remove this
        u.actions = (
          <div>
            <a href='?'>Reset Password</a>
            <br />
            <a href='?'>Delete User</a>
          </div>
        );
        users.push(u);
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

import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import axios from '../../plugins/Axios';
import { UserListActions } from './UserListActions';
import { UserEntry } from '../../interfaces/UserEntry';
import { getRoleString } from '../../router/Roles';

const { Search } = Input;

export const UserList = () => {

  const getColumns = () => ({
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email',
    roleString: 'Role',
    actions: 'Actions'
  });

  const emptyData : UserEntry[] = [];

  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = [];
    axios.get('users').then(({ data }) => {
      rows = data;
      if (searchValue.trim() !== '') {
        rows = rows.filter(
          (r : UserEntry) => {
            const name = r.firstName + ' ' + r.lastName;
            return name.trim().toLowerCase().includes(searchValue.trim().toLowerCase());
          }
        );
      }
      rows.forEach((user : UserEntry) => {
        user.roleString = getRoleString(user.role);
        user.actions = <UserListActions user={user} />;
      });
      setTableData(rows);
    });

  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for a user'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          tableData.length > 0 ?
            <ResponsiveTable rows={tableData} cols={getColumns()} /> :
            <span>No users were found.</span>
        }
      </Card>
    </div>
  );
};

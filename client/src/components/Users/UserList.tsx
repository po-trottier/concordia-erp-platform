import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ResponsiveTable } from '../ResponsiveTable';
import { UserListActions } from './UserListActions';
import { getRoleString } from '../../router/Roles';
import { setUserList } from '../../store/slices/UserListSlice';
import { RootState } from '../../store/Store';
import { UserEntry } from '../../interfaces/UserEntry';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const UserList = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state : RootState) => state.userList.list);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('users').then(({ data }) => {
      dispatch(setUserList(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const getUserList = () => {
    let rows = JSON.parse(JSON.stringify(userList));

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

    rows.sort((a : UserEntry, b : UserEntry) => {
      const nameA = a.firstName + a.lastName;
      const nameB = b.firstName + b.lastName;
      return nameA < nameB ? -1 : 1;
    });

    return rows;
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getColumns = () => ({
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email',
    roleString: 'Role',
    actions: 'Actions'
  });

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for a user'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          getUserList().length > 0 ?
            <ResponsiveTable values={getUserList()} columns={getColumns()} /> :
            <span>No users were found.</span>
        }
      </Card>
    </div>
  );
};

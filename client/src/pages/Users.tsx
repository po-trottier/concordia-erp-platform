import React from 'react';
import { UserList } from '../components/Users/UserList';
import { Button } from 'antd';

export const Users = () => {
  return (
    <div>
      <UserList />
      <Button type='primary' style={{ marginTop: 16 }}>
        Add a new User
      </Button>
    </div>
  );
};

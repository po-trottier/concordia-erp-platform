import React from 'react';
import { Link } from 'react-router-dom';
import { UserList } from '../../components/Users/UserList';
import { Button } from 'antd';

export const Users = () => {

  return (
    <div>
      <UserList />
      <Link to="/users/add-user">
        <Button type='primary' style={{ marginTop: 16 }}>
        Add a new User
        </Button>
      </Link>
    </div> 
  );
};

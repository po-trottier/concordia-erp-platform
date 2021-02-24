import React from 'react';
import { UserList } from '../components/Users/UserList';
import { AddUserModal } from '../components/Users/AddUserModal';

export const Users = () => {
  return (
    <div>
      <UserList />
      <AddUserModal />
    </div>
  );
};
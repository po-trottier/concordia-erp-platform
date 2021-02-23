import React, { useState } from 'react';
import { UserList } from '../components/Users/UserList';
import { AddUserModal } from '../components/Users/AddUserModal';
import { Button, Modal, Form } from 'antd';

export const Users = () => {

  return (
    <div>
      <UserList />
      <AddUserModal />
    </div> 
  );
};

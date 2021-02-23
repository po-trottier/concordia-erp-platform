import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserList } from '../../components/Users/UserList';
import { AddUserModal } from '../../components/Users/AddUserModal';
import { Button, Modal, Form } from 'antd';

export const Users = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <UserList />
      <AddUserModal />
    </div> 
  );
};

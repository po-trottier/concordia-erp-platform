import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { AddUserForm } from '../../components/AddUserForm';

export const AddUser = () => {

    return(
      <div>
        <Link to='/users'>
          <Button type='primary' style={{marginBottom: 16 }}>
            Back to Users
          </Button>
        </Link>
        <AddUserForm></AddUserForm>
      </div>
    );
}
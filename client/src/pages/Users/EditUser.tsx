import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { EditUserForm } from '../../components/Users/EditUserForm';

export const EditUser = (props: any) => {

	return(
		<div>
        <Link to='/users'>
          <Button type='primary' style={{marginBottom: 16 }}>
            Back to Users
          </Button>
        </Link>
        <EditUserForm id={props.id}></EditUserForm>
		</div>
	);
}
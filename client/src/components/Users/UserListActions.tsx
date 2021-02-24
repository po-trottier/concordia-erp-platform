import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import axios from '../../plugins/Axios'
import { UserEntry } from '../../interfaces/UserEntry';
import { EditUserForm } from './EditUserForm';


export const UserListActions = (props : any) => {

		const [editLoading, setEditLoading] = useState(false);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [editVisible, setEditVisible] = React.useState(false);
		const [deleteVisible, setDeleteVisible] = React.useState(false);

		const handleEditButton = (user : UserEntry) => {
			console.log(user);
			setEditVisible(true);
		}

		const handleDeleteButton = (user : UserEntry) => {
			console.log(user);
			setDeleteVisible(true);
		}

		const editUser = () => {

			setEditLoading(true);
			axios.patch('/users/' + props.user.username)
				.catch((err) => {
					message.error('Something went wrong while editing the user.');
					console.error(err);
				})
				.then(res => {
					console.log(res);
					message.success('User was edited successfully.');
				})
				.finally(() => {
					props.setEditVisible(false);
					props.setEditLoading(false);
				});
		};
	
		const deleteUser = () => {
			console.log('fuck');
			setDeleteLoading(true);
			axios.delete('/users/' + props.user.username)
				.catch((err) => {
					message.error('Something went wrong while deleting the user.');
					console.error(err);
				})
				.then(() => {
					message.success('User was deleted successfully.');
				})
				.finally(() => {
					setDeleteVisible(false);
					setDeleteLoading(false);
				});
		};

    return(
			<div>
				<Button
					type="primary"
					size="small"
					style={{ marginRight: 8, width: 60 }}
					onClick={() => handleEditButton(props.user)}>
					Edit
				</Button>
				<Button
					type="ghost"
					size="small"
					style={{ width: 60 }}
					onClick={() => handleDeleteButton(props.user)}>
					Delete
				</Button>
				<Modal
					title="Edit User"
					visible={editVisible}
					confirmLoading={editLoading}
					onOk={editUser}
					onCancel={() => setEditVisible(false)}>
					<EditUserForm
					initialiName={props.user.name}
					initialiUsername={props.user.username}
					initialEmail={props.user.email}
					initialRole={props.user.role}
					editLoading={editLoading}
					editUser={editUser} />
				</Modal>
				<Modal
					title="Delete User"
					visible={deleteVisible}
					confirmLoading={deleteLoading}
					onOk={deleteUser}
					onCancel={() => setDeleteVisible(false)}>
					<p>Are you sure you want to delete the user &quot;{props.user.username}&quot;?</p>
				</Modal>
			</div>
    );
}
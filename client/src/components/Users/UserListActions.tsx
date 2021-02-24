import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import axios from '../../plugins/Axios'
import { EditUserForm } from './EditUserForm';

export const UserListActions = (props : any) => {

		const [editLoading, setEditLoading] = useState(false);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [editVisible, setEditVisible] = React.useState(false);
		const [deleteVisible, setDeleteVisible] = React.useState(false);

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
					setEditVisible(false);
					setEditLoading(false);
				});
		};
	
		const deleteUser = () => {
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
					onClick={() => setEditVisible(true)}>
					Edit
				</Button>
				<Button
					type="ghost"
					size="small"
					style={{ width: 60 }}
					onClick={() => setDeleteVisible(true)}>
					Delete
				</Button>
				<Modal
					title="Edit User"
					visible={editVisible}
					confirmLoading={editLoading}
					onOk={editUser}
					onCancel={() => setEditVisible(false)}>
					<EditUserForm
					user={props.user}
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
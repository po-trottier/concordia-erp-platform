import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import { EditUserForm } from './EditUserForm';
import axios from '../../plugins/Axios';
import { useDispatch } from 'react-redux';

export const UserListActions = (props : any) => {
  const dispatch = useDispatch();

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const initiateEdit = () => {
    setEditVisible(true);
  };

  const editUser = () => {
    setEditLoading(true);
    axios.patch('/users/' + props.user.username)
      .then(res => {
        setEditVisible(false);
        message.success('User was edited successfully.');
      })
      .catch((err) => {
        message.error('Something went wrong while editing the user.');
        console.error(err);
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  const deleteUser = () => {
    setDeleteLoading(true);
    axios.delete('/users/' + props.user.username)
      .then(() => {
        setDeleteVisible(false);
        message.success('User was deleted successfully.');
      })
      .catch((err) => {
        message.error('Something went wrong while deleting the user.');
        console.error(err);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <div>
      <Button
        type='ghost'
        size='small'
        style={{ marginRight: 8, width: 60 }}
        onClick={initiateEdit}>
        Edit
      </Button>
      <Modal
        title='Edit User'
        visible={editVisible}
        confirmLoading={editLoading}
        onOk={editUser}
        onCancel={() => setEditVisible(false)}
        footer={[
          <Button
            key='delete'
            type='dashed'
            style={{ float: 'left' }}
            onClick={() => setDeleteVisible(true)}>
            Remove
          </Button>,
          <Button
            key='cancel'
            type='ghost'
            onClick={() => setEditVisible(false)}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={() => editUser()}>
            OK
          </Button>
        ]}>
        <EditUserForm />
      </Modal>
      <Modal
        title='Delete User'
        visible={deleteVisible}
        confirmLoading={deleteLoading}
        onOk={deleteUser}
        onCancel={() => setDeleteVisible(false)}>
        <p>Are you sure you want to delete the user &quot;{props.user.username}&quot;?</p>
      </Modal>
    </div>
  );
};
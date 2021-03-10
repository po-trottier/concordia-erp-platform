import React, { useState } from 'react';
import { Button, message, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { EditUserForm } from './EditUserForm';
import { RootState } from '../../store/Store';
import { initializeSelectedUser } from '../../store/slices/UserEditSlice';
import { removeUserEntry, updateUserEntry } from '../../store/slices/UserListSlice';
import axios from '../../plugins/Axios';

export const UserListActions = (props : any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state : RootState) => state.login.user);
  const updatedUser = useSelector((state : RootState) => state.edit.selectedUser);

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const initiateEdit = () => {
    dispatch(initializeSelectedUser(props.user));
    setEditVisible(true);
  };

  const editUser = () => {
    if (!updatedUser) {
      message.error('Something went wrong while editing the user.');
      return;
    }
    setEditLoading(true);
    axios.patch('/users/' + props.user.username, updatedUser)
      .then(() => {
        dispatch(updateUserEntry({
          username: props.user.username,
          newUser: updatedUser,
        }));
        setEditVisible(false);
        message.success('User was edited successfully.');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.error(err);
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  const deleteUser = () => {
    if (loggedIn.username === props.user.username) {
      message.error('You cannot delete your own account.');
      return;
    }
    setDeleteLoading(true);
    axios.delete('/users/' + props.user.username)
      .then(() => {
        dispatch(removeUserEntry(props.user.username));
        setDeleteVisible(false);
        setEditVisible(false);
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
        <EditUserForm form={form}/>
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
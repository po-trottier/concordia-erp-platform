import React, { useState } from 'react';
import { Button, message, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { EditCustomerForm } from "./EditCustomerForm";
import { RootState } from '../../store/Store';
import { initializeSelectedCustomer } from '../../store/slices/CustomerEditSlice';
import { removeCustomerEntry, updateCustomerEntry } from '../../store/slices/CustomerListSlice';
import axios from '../../plugins/Axios';

export const CustomerListActions = (props : any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const updatedCustomer = useSelector((state : RootState) => state.edit.selectedCustomer);

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const initiateEdit = () => {
    dispatch(initializeSelectedCustomer(props.user));
    setEditVisible(true);
  };

  const editCustomer = () => {
    if (!updatedCustomer) {
      message.error('Something went wrong while editing the customer.');
      return;
    }
    setEditLoading(true);
    axios.patch('/customers' + props.customer.name, updatedCustomer)
      .then(() => {
        dispatch(updateCustomerEntry({
          id: props.customer._id,
          newCustomer: updatedCustomer,
        }));
        setEditVisible(false);
        message.success('Customer was edited successfully.');
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
    setDeleteLoading(true);
    axios.delete('/customers/' + props.customer.name)
      .then(() => {
        dispatch(removeCustomerEntry(props.customer.name));
        setDeleteVisible(false);
        setEditVisible(false);
        message.success('Customer was deleted successfully.');
      })
      .catch((err) => {
        message.error('Something went wrong while deleting the customer.');
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
        title='Edit Customer'
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
            onClick={() => editCustomer()}>
            OK
          </Button>
        ]}>
        <EditCustomerForm form={form} />
      </Modal>
      <Modal
        title='Delete Customer'
        visible={deleteVisible}
        confirmLoading={deleteLoading}
        onOk={deleteUser}
        onCancel={() => setDeleteVisible(false)}>
        <p>Are you sure you want to delete the customer &quot;{props.customer.name}&quot;?</p>
      </Modal>
    </div>
  );
};
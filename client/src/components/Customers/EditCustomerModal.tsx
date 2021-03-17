import React, { HTMLProps, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { CustomerEntry } from '../../interfaces/CustomerEntry';
import { updateCustomerEntry, removeCustomerEntry } from '../../store/slices/CustomerListSlice';
import axios from '../../plugins/Axios';

interface CustomProps extends HTMLProps<HTMLDivElement> {
  customer : CustomerEntry
}

export const EditCustomerModal = (props : CustomProps) => {
  const { customer, ...rest } = props;

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [editLoading, setEditLoading] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const editCustomer = () => {
    setEditLoading(true);
    const newCustomer = {
      name: customer.name,
      email: customer.email,
    }
    axios.patch('/customers/' + customer._id, newCustomer)
      .then(({ data }) => {
        dispatch(updateCustomerEntry({
          id: customer._id,
          newCustomer: data,
        }));
        setEditVisible(false);
        message.success('Customer was edited successfully.');
      })
      .catch((err) => {
        message.error('Something went wrong while editing the customer.');
        console.error(err);
      })
      .finally(() => {
        setEditLoading(false);
      });
  }

  const deleteCustomer = () => {
    setDeleteLoading(true);

    axios.delete('/customers/' + customer._id)
      .then(() => {
        dispatch(removeCustomerEntry(customer._id));
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
  }

  return (
    <div {...rest}>
      <Button
        type='ghost'
        size='small'
        style={{ marginRight: 8, width: '100%' }}
        onClick={() => setEditVisible(true)}>
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
            onClick={editCustomer}>
            OK
          </Button>
        ]}>
        <Form
          form={form}
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
          initialValues={{
            'id': customer._id,
            'name': customer.name,
            'email': customer.email,
          }}>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Company:</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='name'
                rules={[{ required: true, message: 'Please input the company name!' }]}>
                <Input
                  placeholder="Enter the customer's name"
                  onChange={(val) => {
                    customer.name = val.target.value;
                  }} />
              </Form.Item>
            </Col>
          </Row>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>Email:</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='email'
                rules={[{ required: true, message: 'Please input an email!' }]}>
                <Input
                  placeholder="Enter the customer's email"
                  onChange={(val) => {
                    customer.email = val.target.value;
                  }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title='Delete Customer'
        visible={deleteVisible}
        confirmLoading={deleteLoading}
        onOk={deleteCustomer}
        onCancel={() => setDeleteVisible(false)}>
        <p>Are you sure you want to delete the customer &quot;{props.customer.name}&quot;?</p>
      </Modal>
    </div>
  );
};

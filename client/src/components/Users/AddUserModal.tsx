import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';

import { addUserEntry } from '../../store/slices/UserListSlice';
import { Role } from '../../router/Roles';
import axios from '../../plugins/Axios';

const { Option } = Select;

export const AddUserModal = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(false);

  const addUser = () => {
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      role,
    };

    setLoading(true);
    axios.post('/users', newUser)
      .then(() => {
        dispatch(addUserEntry(newUser));
        setIsModalVisible(false);
        form.resetFields();
        message.success('User was added successfully.');
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='primary' style={{ marginTop: 16 }} onClick={() => setIsModalVisible(true)}>
        Add a new User
      </Button>
      <Modal
        title='Add New User'
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={addUser}
          name='basic'
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
          initialValues={{}}>
          <Form.Item
            label='First Name'
            name='fistName'
            rules={[{ required: true, message: 'Please input first name!' }]}>
            <Input onChange={(e) => setFirstName(e.currentTarget.value)} />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='lastName'
            rules={[{ required: true, message: 'Please input last name!' }]}>
            <Input onChange={(e) => setLastName(e.currentTarget.value)} />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input email address!' }]}>
            <Input onChange={(e) => setEmail(e.currentTarget.value)} />
          </Form.Item>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input username!' }]}>
            <Input onChange={(e) => setUsername(e.currentTarget.value)} />
          </Form.Item>
          <Form.Item
            label='Role'
            name='Role'
            rules={[{ required: true, message: 'Please select a role!' },
            ]}>
            <Select
              placeholder="Select the user's role"
              onSelect={(e : Role) => setRole(e)}>
              <Option value={1}>Salesperson</Option>
              <Option value={2}>Accountant</Option>
              <Option value={3}>Inventory Manager</Option>
              <Option value={4}>System Administrator</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

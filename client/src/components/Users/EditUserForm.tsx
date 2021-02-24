import React from 'react';
import { Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setEmail, setFirstName, setLastName, setRole, setUsername } from '../../store/slices/UserEditSlice';
import { getRoleString, Role } from '../../router/Roles';
import { RootState } from '../../store/Store';

const { Option } = Select;

export const EditUserForm = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const selectedUser = useSelector((state : RootState) => state.edit.selectedUser);

  return (
    <Form
      form={form}
      name='basic'
      style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
      initialValues={{
        'firstName': selectedUser.firstName,
        'lastName': selectedUser.lastName,
        'email': selectedUser.email,
        'username': selectedUser.username,
        'role': getRoleString(selectedUser.role),
      }}>
      <Form.Item
        label='First Name'
        name='firstName'
        rules={[{ required: true, message: 'Please input first name!' }]}>
        <Input onChange={(e) => dispatch(setFirstName(e.currentTarget.value))} />
      </Form.Item>
      <Form.Item
        label='Last Name'
        name='lastName'
        rules={[{ required: true, message: 'Please input last name!' }]}>
        <Input onChange={(e) => dispatch(setLastName(e.currentTarget.value))} />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input email address!' }]}>
        <Input onChange={(e) => dispatch(setEmail(e.currentTarget.value))} />
      </Form.Item>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input username!' }]}>
        <Input onChange={(e) => dispatch(setUsername(e.currentTarget.value))} />
      </Form.Item>
      <Form.Item
        label='Role'
        name='role'
        rules={[{ required: true, message: 'Please select a role!' }]}>
        <Select
          placeholder="Select the user's role"
          onSelect={() => (e : Role) => dispatch(setRole(e))}>
          <Option value={1}>Salesperson</Option>
          <Option value={2}>Accountant</Option>
          <Option value={3}>Inventory Manager</Option>
          <Option value={4}>System Administrator</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { getRoleString } from '../../router/Roles';

export const EditUserForm = (props : any) => {
  const { Option } = Select;

  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [username, setUsername] = useState(props.user.username);
  const [role, setRole] = useState(props.user.role);

  return (
    <Form
      form={form}
      name='basic'
      style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
      initialValues={{
        firstName,
        lastName,
        email,
        username
      }}>
      <Form.Item
        label='First Name'
        name='firstName'
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
        rules={[{ required: true, message: 'Please select a role!' }]}>
        <Select
          placeholder="Select the user's role"
          onSelect={() => (e : number) => setRole(e)}
          defaultValue={getRoleString(role)}>
          <Option value={1}>Salesperson</Option>
          <Option value={2}>Accountant</Option>
          <Option value={3}>Inventory Manager</Option>
          <Option value={4}>System Administrator</Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

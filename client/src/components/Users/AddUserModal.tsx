import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, message, Spin } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../plugins/Axios';

export const AddUserModal = () => {

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(0);
  const [addLoading, setAddLoading] = useState(false);

  const handleFirstName = (e : React.FormEvent<HTMLInputElement>) =>
  setFirstName(e.currentTarget.value);

  const handleLastName = (e : React.FormEvent<HTMLInputElement>) =>
  setLastName(e.currentTarget.value);

  const handleEmail = (e : React.FormEvent<HTMLInputElement>) =>
  setEmail(e.currentTarget.value);

  const handleUsername = (e : React.FormEvent<HTMLInputElement>) =>
  setUsername(e.currentTarget.value);

  const handleRole = (e : number) => {
    setRole(e);
  }

  const addUser = () => {
    setAddLoading(true);
    axios.post('/users', {
      name: firstName + ' ' + lastName,
      username: username,
      email: email,
      password: 'Password1!',
      role: role,
    })
      .catch(err => {
        message.error('Something went wrong with adding the new user.');
        console.error(err);
      })
      .then(res => {
        console.log(res);
        message.success('User was added successfully.');
      })
      .finally(() => {
        setAddLoading(false);
        form.resetFields();
        setIsModalVisible(false);
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(username);
        console.log(role);
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };


  return (
    <div>
      <Button type='primary' style={{ marginTop: 16 }} onClick={() => setIsModalVisible(true)}>
      Add a new User
      </Button>
      <Modal title='Add New User' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
      <Spin indicator={antIcon} spinning={addLoading}>
      <Form
          form={form}
          onFinish={addUser}
					name='basic'
					style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px'}}
					initialValues={{
					}}>
					<Form.Item
						label='First Name'
						name='fistName'
						rules={[{ required: true, message: 'Please input first name!' }]}>
						<Input onChange={handleFirstName} />
					</Form.Item>
					<Form.Item
						label='Last Name'
						name='lastName'
						rules={[{ required: true, message: 'Please input last name!' }]}>
						<Input onChange={handleLastName} />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[{ required: true, message: 'Please input email address!' }]}>
						<Input onChange={handleEmail} />
					</Form.Item>
					<Form.Item
						label='Username'
						name='username'
						rules={[{ required: true, message: 'Please input username!' }]}>
						<Input onChange={handleUsername} />
					</Form.Item>
					<Form.Item
						label="Role"
						name="Role"
						rules={[{required: true, message: 'Please select a role!'},
						]}
						>
						<Select
								placeholder="Select the user's role"
								allowClear
								onSelect={handleRole}
						>
              <Option value={0}>Basic User</Option>
              <Option value={1}>Salesperson</Option>
              <Option value={2}>Accountant</Option>
              <Option value={3}>Invetory Manager</Option>
              <Option value={4}>System Administator</Option>
						</Select>
					</Form.Item>
				</Form>
        </Spin>
      </Modal>
    </div>
    );
};

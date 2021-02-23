import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { LabeledValue } from 'antd/lib/select';

export const AddUserModal = () => {

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  let role : LabeledValue;

  const handleFirstName = (e : React.FormEvent<HTMLInputElement>) =>
  setFirstName(e.currentTarget.value);

  const handleLastName = (e : React.FormEvent<HTMLInputElement>) =>
  setLastName(e.currentTarget.value);

  const handleEmail = (e : React.FormEvent<HTMLInputElement>) =>
  setEmail(e.currentTarget.value);

  const handleRole = (e : LabeledValue) =>
  role = e;

  const handleUsername = (e : React.FormEvent<HTMLInputElement>) =>
  setUsername(e.currentTarget.value);

  const addUser = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(email);
    console.log(username);
    console.log(role);
    setIsModalVisible(false);
    form.resetFields();
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
						</Select>
					</Form.Item>
				</Form>
      </Modal>
    </div> 
  );
};

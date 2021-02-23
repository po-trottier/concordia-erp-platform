import React, { useState } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';

export const EditUserForm = (props : any) => {

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Option } = Select;
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState('first name');
  const [lastName, setLastName] = useState('last name');
  const [email, setEmail] = useState('test@email.com');
  const [username, setUsername] = useState('username');
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

  return (
		<Spin indicator={antIcon} spinning={props.editLoading}>
			<Form
				form={form}
				onFinish={props.editUser}
				name='basic'
				style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px'}}
				initialValues={{
					firstName,
					lastName,
					email,
					username,
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
							<Option value="Basic User">Basic User</Option>
              <Option value="Salesperson">Salesperson</Option>
              <Option value="Accountant">Accountant</Option>
              <Option value="Inventory Manager">Invetory Manager</Option>
              <Option value="System Administrator">System Administator</Option>
					</Select>
				</Form.Item>
			</Form>
		</Spin>
  );
};

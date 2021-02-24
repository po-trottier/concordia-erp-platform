import React, { useState } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';

export const EditUserForm = (props : any) => {

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Option } = Select;
  const [form] = Form.useForm();

  const [firstName, setFirstName] = useState(props.initialiName);
  const [lastName, setLastName] = useState(props.initialiName);
  const [email, setEmail] = useState(props.initialEmail);
  const [username, setUsername] = useState(props.initialiUsername);
  const [role, setRole] = useState(props.initialRole);

  const handleFirstName = (e : React.FormEvent<HTMLInputElement>) =>{}

  const handleLastName = (e : React.FormEvent<HTMLInputElement>) =>{}

  const handleEmail = (e : React.FormEvent<HTMLInputElement>) =>{}

  const handleUsername = (e : React.FormEvent<HTMLInputElement>) =>
	setUsername(e.currentTarget.value);

  const handleRole = (e : number) =>{}

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
					role,
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
  );
};

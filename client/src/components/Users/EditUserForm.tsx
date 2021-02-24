import React, { useState } from 'react';
import { Form, Input, Select, Spin } from 'antd';
import 'antd/dist/antd.css';
import { LoadingOutlined } from '@ant-design/icons';

export const EditUserForm = (props : any) => {
	
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [username, setUsername] = useState(props.user.username);
  const [role, setRole] = useState(props.user.role);

  const handleFirstName = (e : React.FormEvent<HTMLInputElement>) =>
	setFirstName(e.currentTarget.value);

  const handleLastName = (e : React.FormEvent<HTMLInputElement>) =>
	setLastName(e.currentTarget.value);

  const handleEmail = (e : React.FormEvent<HTMLInputElement>) =>
	setEmail(e.currentTarget.value);

  const handleUsername = (e : React.FormEvent<HTMLInputElement>) =>
	setUsername(e.currentTarget.value);

  const handleRole = (e : number) => setRole(e);

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
					username
				}}>
				<Form.Item
					label='First Name'
					name='firstName'
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
							onSelect={() => handleRole}
							defaultValue={
								role == 0 ? 'Basic User' :
								role == 1 ? 'Salesperson' :
								role == 2 ? 'Accountant' :
								role == 3 ? 'Inventory Manager' :
								'System Administrator'
							}
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

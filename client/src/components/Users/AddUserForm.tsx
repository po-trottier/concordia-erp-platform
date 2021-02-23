import React, { useState } from 'react'
import { Form, Input, Button, Select, Card, Typography } from 'antd';
import { LabeledValue } from 'antd/lib/select';

const { Title } = Typography;
const { Option } = Select; 

export const AddUserForm = () => {

		const [loading, setLoading] = useState(false);
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
			setLoading(true);
			console.log(firstName);
			console.log(lastName);
			console.log(email);
			console.log(email);
			console.log(username);
			console.log(role);
			setLoading(false);
		}

    return(
			<Card>
				<Title level={4}>Add User</Title>
				<Form
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
								<Option value="Basic User">Basic User</Option>
								<Option value="Salesperson">Salesperson</Option>
								<Option value="Accountant">Accountant</Option>
								<Option value="Inventory Manager">Invetory Manager</Option>
								<Option value="System Administrator">System Administator</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' style={{ width: '100%' }} onClick={addUser}>
						Register
						</Button>
					</Form.Item>
				</Form>
			</Card>
		);
}
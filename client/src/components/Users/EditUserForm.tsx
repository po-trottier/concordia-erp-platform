import React from 'react'
import { Form, Input, Button, Select, Card, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select; 

export const EditUserForm = (props: any) => {

		//get user info from user id and then set initial values.

    return(
			<Card>
				<Title level={4}>Edit User</Title>
				<Form
					name='basic'
					style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px'}}
					initialValues={{
					}}>
					<Form.Item
						label='First Name'
						name='fistName'
						rules={[{ required: true, message: 'Please input first name!' }]}>
						<Input onChange={(e) => (e)} />
					</Form.Item>
					<Form.Item
						label='Last Name'
						name='lastName'
						rules={[{ required: true, message: 'Please input last name!' }]}>
						<Input onChange={(e) => (e)} />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[{ required: true, message: 'Please input email address!' }]}>
						<Input onChange={(e) => (e)} />
					</Form.Item>
					<Form.Item
						label='Username'
						name='username'
						rules={[{ required: true, message: 'Please input username!' }]}>
						<Input onChange={(e) => (e)} />
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
						>
								<Option value="basicUser">Basic User</Option>
								<Option value="salesperson">Salesperson</Option>
								<Option value="accountant">Accountant</Option>
								<Option value="invetoryManager">Invetory Manager</Option>
								<Option value="systemAdmin">System Administator</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' style={{ width: '100%' }}>
						Save
						</Button>
					</Form.Item>
				</Form>
			</Card>
		);
}
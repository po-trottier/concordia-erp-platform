import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useDispatch } from 'react-redux';

import { addCustomerEntry } from '../../store/slices/CustomerListSlice';
import axios from '../../plugins/Axios';

export const CreateCustomerModal = () => {
	const dispatch = useDispatch();

	const [form] = Form.useForm();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const addCustomer = () => {
		setLoading(true);
		axios
			.post('/customers', {
				name,
				email,
			})
			.then(({ data }) => {
				const newCustomer = data;
				newCustomer.balance = 0;
				newCustomer.paid = 0;
				newCustomer.items = 0;

				dispatch(addCustomerEntry(newCustomer));
				setIsModalVisible(false);
				form.resetFields();

				message.success('Customer was added successfully.');
			})
			.catch((err) => {
				message.error('Something went wrong while creating the customer.');
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
			<Button
				type="primary"
				style={{ marginTop: 16 }}
				onClick={() => setIsModalVisible(true)}
			>
				Create New Customer
			</Button>
			<Modal
				title="Create New Customer"
				visible={isModalVisible}
				confirmLoading={loading}
				onOk={form.submit}
				onCancel={handleCancel}
			>
				<Form
					form={form}
					onFinish={addCustomer}
					name="basic"
					style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
				>
					<Row align="middle" style={{ marginBottom: 24 }}>
						<Col sm={5} span={8}>
							<span>Company:</span>
						</Col>
						<Col sm={19} span={16}>
							<Form.Item
								style={{ marginBottom: 0 }}
								name="companyName"
								rules={[
									{ required: true, message: 'Please input company name!' },
								]}
							>
								<Input
									placeholder="Enter the company name"
									onChange={(e) => setName(e.currentTarget.value)}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row align="middle" style={{ marginBottom: 24 }}>
						<Col sm={5} span={8}>
							<span>Email:</span>
						</Col>
						<Col sm={19} span={16}>
							<Form.Item
								style={{ marginBottom: 0 }}
								name="itemsBought"
								rules={[
									{
										required: true,
										message: 'Please input the amount of items bought!',
									},
								]}
							>
								<Input
									placeholder="Enter an email address"
									onChange={(e) => setEmail(e.currentTarget.value)}
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>
	);
};

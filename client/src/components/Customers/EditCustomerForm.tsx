import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setEmail, setName } from '../../store/slices/CustomerEditSlice';
import { RootState } from '../../store/Store';

export const EditCustomerForm = (props : any) => {
  const dispatch = useDispatch();

  const selectedCustomer = useSelector((state : RootState) => state.edit.selectedCustomer);

  return (
    <Form
      form={props.form}
      name='basic'
      style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
      initialValues={{
        'id': selectedCustomer._id,
        'name': selectedCustomer.name,
        'email': selectedCustomer.email,
      }}>
      <Row align='middle' style={{ marginBottom: 24 }}>
        <Col sm={5} span={8}>
          <span>Company:</span>
        </Col>
        <Col sm={19} span={16}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='name'
            rules={[{ required: true, message: 'Please input the company name!' }]}>
            <Input placeholder="Enter the user's first name"
                   onChange={(e) => dispatch(setName(e.currentTarget.value))} />
          </Form.Item>
        </Col>
      </Row>
      <Row align='middle' style={{ marginBottom: 24 }}>
        <Col sm={5} span={8}>
          <span>Email:</span>
        </Col>
        <Col sm={19} span={16}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='email'
            rules={[{ required: true, message: 'Please input an email!' }]}>
            <Input placeholder="Enter the customer's email"
                   onChange={(e) => dispatch(setEmail(e.currentTarget.value))} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setEmail, setFirstName, setLastName, setRole, setUsername } from '../../store/slices/UserEditSlice';
import { getRoleString, Role } from '../../router/Roles';
import { RootState } from '../../store/Store';

const { Option } = Select;

export const EditUserForm = (props : any) => {
  const dispatch = useDispatch();

  const selectedUser = useSelector((state : RootState) => state.edit.selectedUser);

  let dropdownOffset = 0;

  return (
    <Form
      form={props.form}
      name='basic'
      style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}
      initialValues={{
        'firstName': selectedUser.firstName,
        'lastName': selectedUser.lastName,
        'email': selectedUser.email,
        'username': selectedUser.username,
        'role': getRoleString(selectedUser.role),
      }}>
      <Row align='middle' style={{ marginBottom: 24 }}>
        <Col sm={5} span={8}>
          <span>First Name:</span>
        </Col>
        <Col sm={19} span={16}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='firstName'
            rules={[{ required: true, message: 'Please input first name!' }]}>
            <Input placeholder="Enter the user's first name"
                   onChange={(e) => dispatch(setFirstName(e.currentTarget.value))} />
          </Form.Item>
        </Col>
      </Row>
      <Row align='middle' style={{ marginBottom: 24 }}>
        <Col sm={5} span={8}>
          <span>Last Name:</span>
        </Col>
        <Col sm={19} span={16}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='lastName'
            rules={[{ required: true, message: 'Please input last name!' }]}>
            <Input placeholder="Enter the user's last name"
                   onChange={(e) => dispatch(setLastName(e.currentTarget.value))} />
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
            rules={[{ required: true, message: 'Please input email address!' }]}>
            <Input placeholder="Enter the user's email" onChange={(e) => dispatch(setEmail(e.currentTarget.value))} />
          </Form.Item>
        </Col>
      </Row>
      <Row align='middle' style={{ marginBottom: 24 }}>
        <Col sm={5} span={8}>
          <span>Username:</span>
        </Col>
        <Col sm={19} span={16}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='username'
            rules={[{ required: true, message: 'Please input username!' }]}>
            <Input placeholder="Enter the user's username"
                   onChange={(e) => dispatch(setUsername(e.currentTarget.value))} />
          </Form.Item>
        </Col>
      </Row>
      <Row align='middle' style={{ marginBottom: 24 }}>
        <Col sm={5} span={8}>
          <span>Role:</span>
        </Col>
        <Col sm={19} span={16}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='role'
            rules={[{ required: true, message: 'Please select a role!' }]}>
            <Select
              placeholder="Select the user's role"
              onSelect={(e : any) => dispatch(setRole(e))}>
              {
                Object.keys(Role).map((key, val) => {
                  if (isFinite(Number(key))) {
                    dropdownOffset++;
                    return null;
                  }
                  const role : Role = val - dropdownOffset;
                  return (
                    <Option key={key} value={role}>{getRoleString(role)}</Option>
                  );
                })
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

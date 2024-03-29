import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';

import { addUserEntry } from '../../store/slices/UserListSlice';
import { getRoleString, Role } from '../../router/Roles';
import axios from '../../plugins/Axios';

const { Option } = Select;

export const AddUserModal = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(false);

  const addUser = () => {
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      role,
    };

    setLoading(true);
    axios
      .post('/users', newUser)
      .then(() => {
        dispatch(addUserEntry(newUser));
        setIsModalVisible(false);
        form.resetFields();
        message.success('User was added successfully.');
      })
      .catch((err) => {
        message.error('Something went wrong while creating the user.');
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

  let dropdownOffset = 0;

  return (
    <div>
      <Button
        type='primary'
        style={{ marginTop: 16 }}
        onClick={() => setIsModalVisible(true)}>
        Add a new User
      </Button>
      <Modal
        title='Add New User'
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={addUser}
          name='basic'
          style={{ marginBottom: '-24px', width: '100%', maxWidth: '500px' }}>
          <Row align='middle' style={{ marginBottom: 24 }}>
            <Col sm={5} span={8}>
              <span>First Name:</span>
            </Col>
            <Col sm={19} span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='firstName'
                rules={[
                  { required: true, message: 'Please input first name!' },
                ]}>
                <Input
                  placeholder="Enter the user's first name"
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                />
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
                <Input
                  placeholder="Enter the user's last name"
                  onChange={(e) => setLastName(e.currentTarget.value)}
                />
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
                rules={[
                  { required: true, message: 'Please input email address!' },
                ]}>
                <Input
                  placeholder="Enter the user's email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
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
                <Input
                  placeholder="Enter the user's username"
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
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
                  onSelect={(e : Role) => setRole(e)}>
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
      </Modal>
    </div>
  );
};

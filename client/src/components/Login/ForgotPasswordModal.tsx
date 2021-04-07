import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { UserEntry } from "../../interfaces/UserEntry";
import axios from '../../plugins/Axios';

export const ForgotPasswordModal = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/users')
      .then((res) => {
        if (res && res.data) {
          const data : UserEntry[] = [];
          res.data.forEach((u : any) => {
            data.push({
              username: u['username'],
              firstName: u['firstName'],
              lastName: u['lastName'],
              role: u['role'],
              email: u['email']
            });
          });
        }
      })
      .catch(err => {
        message.error('The email you entered was not found.');
        console.error(err);
      });
  }, [updated]);

  const handleSubmit = (values : any) => {

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type='link' onClick={() => {
        console.log("hello");
        setIsModalVisible(true);
        console.log(isModalVisible);
      }} style={{width: '100%', justifyContent: 'center', marginTop: 8}}>
        Forgot Password?
      </Button>

      <Modal title='Reset Password' visible={isModalVisible} onOk={form.submit} onCancel={handleCancel} style={{zIndex: 99999999999999}}>
        <Form form={form} onFinish={handleSubmit}>
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col span={24}>
              <span>Email:</span>
            </Col>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='email'
                rules={[{ required: true, message: 'Please enter your email.' }]}>
                <Input placeholder='Please enter your email' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
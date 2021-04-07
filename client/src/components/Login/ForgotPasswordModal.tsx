import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import axios from '../../plugins/Axios';

export const ForgotPasswordModal = () => {

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values : any) => {
    setLoading(true);
    axios.post('/auth/request', { email: values.email })
      .then(() => {
        message.success('A password reset email was successfully sent.');
        handleCancel();
      })
      .catch((err) => {
        message.error('Something went wrong while requesting a reset link.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button
        type='link'
        onClick={() => setVisible(true)}
        style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
        Forgot Password?
      </Button>

      <Modal
        title='Reset Password'
        style={{ maxWidth: 400 }}
        visible={visible}
        confirmLoading={loading}
        onOk={form.submit}
        onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          <Row align='middle' style={{ marginBottom: 16 }}>
            <Col span={24}>
              <p style={{ marginBottom: 4 }}>
                Enter the e-mail associated with your account:
              </p>
            </Col>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='email'
                rules={[{ required: true, message: 'Please enter your email.' }]}>
                <Input type='email' placeholder='Please enter your email' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
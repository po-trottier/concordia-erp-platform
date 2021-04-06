import React from 'react';
import { Col, Form, Input, Row } from "antd";

export const ResetPassword = () => {
  return (
    <div>
      <Form>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={4} span={9}>
            <span>Current Password:</span>
          </Col>
          <Col sm={8} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='password'
              rules={[{ required: true, message: 'Please enter your password.' }]}>
              <Input.Password placeholder='Your current password' />
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={4} span={9}>
            <span>New Password:</span>
          </Col>
          <Col sm={8} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='newPassword'
              rules={[{ required: true, message: 'Please enter a new password.' }]}>
              <Input.Password placeholder='Your new password' />
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={4} span={9}>
            <span>Confirm Password:</span>
          </Col>
          <Col sm={8} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='confirmPassword'
              rules={[{ required: true, message: 'Please confirm your new password.' }]}>
              <Input.Password placeholder='Confirm your new password' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

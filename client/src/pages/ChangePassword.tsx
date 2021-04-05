import React from 'react';
import { Col, Form, Input, Row } from "antd";

export const Customers = () => {
  return (
    <div>
      <Form>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={6} span={9}>
            <span>Current Password:</span>
          </Col>
          <Col sm={18} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='password'
              rules={[{ required: true, message: 'Please enter your password.' }]}>
              <Input placeholder='Your current password' />
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={6} span={9}>
            <span>New Password:</span>
          </Col>
          <Col sm={18} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='newPassword'
              rules={[{ required: true, message: 'Please enter a new password.' }]}>
              <Input placeholder='Your new password' />
            </Form.Item>
          </Col>
        </Row>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={6} span={9}>
            <span>Current Password:</span>
          </Col>
          <Col sm={18} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='newPassword'
              rules={[{ required: true, message: 'Please re-enter your new password.' }]}>
              <Input placeholder='Re-enter your new password' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

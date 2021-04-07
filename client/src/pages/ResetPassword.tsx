import React, {useState} from 'react';
import {Button, Col, Form, Input, message, Row, Card} from "antd";
import axios from "../plugins/Axios";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/Store";


export const ResetPassword = () => {

  const location = useLocation();
  const token = location.search ?  new URLSearchParams(location.search).get('token') : '';

  const user = useSelector((state : RootState) => state.login.user);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');

  const validatePassword = () => {
    if(confirmPassword !== newPassword){
      message.error('The passwords do not match.');
      console.log('not the same');
      return;
    }
    console.log('The same');

    axios.post('/auth/forgot', { password:confirmPassword})
      .then(() => {
        console.log('posted new password')
        message.success('Your password has be reset');
      })
      .catch((err) => {
        message.error('Something went wrong while resetting your password');
        console.error(err);
      })
  }

  return (
    <div>
      {user.isLoggedIn ? <h1>{token}</h1> : null}
      <Card>
      <Form>
        <Card>
        <Row align='middle' style={{ marginBottom: 16 }}>
          <Col sm={4} span={9}>
            <span>New Password:</span>
          </Col>
          <Col sm={8} span={15}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name='newPassword'
              rules={[{ required: true, message: 'Please enter a new password.' }]}>
              <Input.Password placeholder='Your new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
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
              <Input.Password placeholder='Confirm your new password' value={confirmPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        </Card>
        <Button type={"primary"} style={{ marginTop: 16}} onClick={validatePassword}>Submit</Button>

      </Form>
      </Card>
    </div>
  );
};

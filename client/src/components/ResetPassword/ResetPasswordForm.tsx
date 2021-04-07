import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {Button, Col, Form, Input, message, Row, Card} from "antd";
import axios from "../../plugins/Axios";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/Store";

export const ResetPasswordForm = () => {

  const history = useHistory();

  const location = useLocation();
  const token = location.search ?  new URLSearchParams(location.search).get('token') : '';

  const user = useSelector((state : RootState) => state.login.user);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = () => {
    if(confirmPassword !== newPassword){
      message.error('The passwords do not match.');
      return;
    }

    let url = '/auth/forgot/';
    if(token && token.trim().length > 0){
      url += token;
    }

    setLoading(true);

    axios.post(url, { password:confirmPassword})
      .then(() => {
        message.success('Your password has be reset');
        history.replace('/some/path')
      })
      .catch((err) => {
        message.error('Something went wrong while resetting your password');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div>
      {user.isLoggedIn ? <h1>{token}</h1> : null}
      <Card>
        <Form>
            <Row align='middle' style={{ marginBottom: 16 }}>
              <Col span={24}>
                <span>New Password:</span>
              </Col>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name='newPassword'
                  rules={[{ required: true, message: 'Please enter a new password.' }]}>
                  <Input.Password
                    placeholder='Your new password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
            <Row align='middle' style={{marginBottom: 16}}>
              <Col span={24}>
                <span>Confirm Password:</span>
              </Col>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name='confirmPassword'
                  rules={[{ required: true, message: 'Please confirm your new password.' }]}>
                  <Input.Password
                    placeholder='Confirm your new password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)} />
                </Form.Item>
              </Col>
            </Row>
          <Button
            type={"primary"}
            style={{ marginTop: 16, width: "100%"}}
            loading={loading}
            onClick={validatePassword}>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

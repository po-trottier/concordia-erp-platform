import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../plugins/Axios';
import { RootState } from '../../store/Store';
import { loginAction } from '../../store/slices/UserSlice';
import { LoginRequest } from '../../interfaces/LoginRequest';

export const LoginForm = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state : RootState) => state.login.user);

  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(user.isRemembered);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const desiredPath = location.search
    ? '/' + new URLSearchParams(location.search).get('redirect')
    : '/home';

  const login = () => {
    setLoading(true);
    axios.post('/auth/login', { username, password })
      .then(({ data }) => {
        const user : LoginRequest = data;
        user.isRemembered = remember;
        dispatch(loginAction(user));
        history.replace(desiredPath);
      })
      .catch((err) => {
        console.error(err);
        message.error('Invalid credentials were entered.');
        setLoading(false);
      });
  };

  return (
    <Form
      style={{ marginBottom: '-24px' }}
      initialValues={{
        username: user.username
      }}
      onFinish={login}>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input onChange={(e) => setUsername(e.currentTarget.value)} />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password onChange={(e) => setPassword(e.currentTarget.value)} />
      </Form.Item>
      <Form.Item name='remember'>
        <Checkbox onChange={(e) => setRemember(e.target.checked)} defaultChecked={user.isRemembered}>
          Remember me
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={loading}
          style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

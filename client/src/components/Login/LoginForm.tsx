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

  const user = useSelector((state : RootState) => state.user.user);

  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(user.isRemembered);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const handleUsername = (e : React.FormEvent<HTMLInputElement>) =>
    setUsername(e.currentTarget.value);

  const handlePassword = (e : React.FormEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  const handleChange = () =>
    setRemember(!remember);

  const desiredPath = location.search
    ? '/' + new URLSearchParams(location.search).get('redirect')
    : '/home';

  const login = () => {
    setLoading(true);
    axios.post('/auth/login', { username, password })
      .then((resp) => {
        if (resp) {
          const user : LoginRequest = resp.data;
          user.isRemembered = remember;
          dispatch(loginAction(user));
          history.replace(desiredPath);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error('Invalid credentials were entered.');
        setLoading(false);
      });
  };

  return (
    <Form
      name='basic'
      style={{ marginBottom: '-24px' }}
      initialValues={{
        username: user.username,
        password: user.password,
      }}
      onFinish={login}>
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input onChange={(e) => handleUsername(e)} />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password onChange={(e) => handlePassword(e)} />
      </Form.Item>
      <Form.Item name='remember'>
        <Checkbox onChange={handleChange} defaultChecked={user.isRemembered}>Remember me</Checkbox>
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

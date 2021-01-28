import React from "react";
import {Button, Form, Input, Checkbox} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

import {loginAction} from "../../store/slices/UserSlice";

export const LoginForm = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const desiredPath = location.search
    ? "/" + new URLSearchParams(location.search).get('redirect')
    : "/dashboard";

  const login = () => {
    dispatch(loginAction({ id: "69420", name: "John Connor" }));
    history.replace(desiredPath);
  };

  const loginFailed = (errorInfo: any) => {
    console.error("Login Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      style={{ marginBottom: '-24px' }}
      initialValues={{ remember: true }}
      onFinish={login}
      onFinishFailed={loginFailed}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

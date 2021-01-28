import React from "react";
import { RootState } from "../store/Store";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActionCreator } from "../store/slices/UserSlice";
import { Button, Typography, Form, Input, Checkbox } from "antd";
const { Title } = Typography;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 4 },
};

export const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const desiredPath = location.search
    ? "/" + location.search.substring(10)
    : "/dashboard";

  const login = () => {
    dispatch(loginActionCreator({ id: "69420", name: "John Connor" }));
    history.replace(desiredPath);
  };

  const loginFailed = (errorInfo: any) => {
    console.log("Login Failed:", errorInfo);
  };

  return (
    <div>
      <Title>Log In</Title>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={login}
        onFinishFailed={loginFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

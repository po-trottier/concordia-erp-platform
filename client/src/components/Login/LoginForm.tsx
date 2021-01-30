import React, {useState} from "react";
import {Button, Form, Input, Checkbox} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../store/Store'

import {loginAction} from "../../store/slices/UserSlice";

export const LoginForm = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state : RootState) => state.user.user);
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
    ? "/" + new URLSearchParams(location.search).get('redirect')
    : "/dashboard";

  const login = () => {
    try{
      if (remember)
        dispatch(loginAction({ id: "69420", name: "John Connor", username: username, password: password, isRemembered: true}));

      else
        dispatch(loginAction({ id: "69420", name: "John Connor", username: "", password: "", isRemembered: false}));

      history.replace(desiredPath);
    } catch(e){
      console.log(password);
      console.log(e);
    }
  };

  const loginFailed = (errorInfo: any) => {
    console.error("Login Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      style={{ marginBottom: '-24px' }}
      initialValues={{
        username: user.username,
        password: user.password,
      }}
      onFinish={login}
      onFinishFailed={loginFailed}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input onChange={(e) => handleUsername(e)} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password onChange={(e) => handlePassword(e)} />
      </Form.Item>
      <Form.Item name="remember">
        <Checkbox onChange={handleChange} defaultChecked={user.isRemembered}>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

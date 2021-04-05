import React from 'react';
import {Button, Card, Form, Layout, Typography} from 'antd';

import { LoginForm } from '../components/Login/LoginForm';
import {ForgotPasswordModal} from "../components/Login/ForgotPasswordModal";

const { Title } = Typography;
const { Content } = Layout;

export const Login = () => {
  return (
    <Layout className='ant-layout-sider' style={{ minHeight: '100vh', minWidth: '100%' }}>
      <Content className='robot-background'>
        <div className='app-centered-card'>
          <Card style={{ margin: '0 32px' }}>
            <Title style={{ textAlign: 'center' }}>Log In</Title>
            <LoginForm />
            <ForgotPasswordModal />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

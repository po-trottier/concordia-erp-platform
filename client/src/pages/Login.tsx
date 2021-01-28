import React from "react";
import {Card, Layout, Typography} from "antd";

import {LoginForm} from "../components/Login/LoginForm";

const {Title} = Typography;
const {Content} = Layout;

export const Login = () => {
  return (
    <Layout className="ant-layout-sider" style={{minHeight: '100vh', minWidth: '100%'}}>
      <Content>
        <div className="app-centered-card">
          <Card style={{ margin: '0 32px' }}>
            <Title style={{ textAlign: 'center' }}>Log In</Title>
            <LoginForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

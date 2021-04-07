import React from 'react';
import { Card, Layout, Typography } from 'antd';

import { ResetPasswordForm } from '../components/ResetPassword/ResetPasswordForm';

const { Title } = Typography;
const { Content } = Layout;

export const ResetPassword = () => {
  return (
    <Layout id='app-content' className='dark-background'
            style={{ minHeight: '100vh', minWidth: '100%', marginLeft: 0 }}>
      <Content className='robot-background'>
        <div className='app-centered-card'>
          <Card style={{ margin: '0 32px' }}>
            <Title style={{ textAlign: 'center' }}>Reset Password</Title>
            <ResetPasswordForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { Login } from '../../pages/Login';

export const App = () => {
  const location = useLocation();
  return location.pathname === '/login' ?
    <Login /> : (
      <Layout style={{ minHeight: '100vh' }}>
        <AppMenu />
        <Layout className='site-layout app-layout'>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    );
};

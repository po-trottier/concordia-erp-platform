import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppMenu } from './AppMenu';
import { AppContent } from './AppContent';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { Login } from '../../pages/Login';
import { RootState } from '../../store/Store';
import axios from '../../plugins/Axios';

export const App = () => {
  // Set axios header on app startup
  const user = useSelector((state : RootState) => state.user.user);
  if (user.isLoggedIn) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  }

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

import React from 'react';
import {Layout} from 'antd';

import {AppMenu} from './AppMenu'
import {AppContent} from './AppContent'
import {AppHeader} from './AppHeader'
import {AppFooter} from './AppFooter'

export const App = () => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <AppMenu />
      <Layout className="site-layout app-layout">
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  );
}

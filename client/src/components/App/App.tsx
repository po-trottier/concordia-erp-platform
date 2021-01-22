import React from 'react';
import {Layout} from 'antd';

import {NavMenu} from './NavMenu'
import {RouterView} from './RouterView'
import {AppHeader} from './AppHeader'
import { AppFooter } from './AppFooter'

export const App = () => {
  const date = new Date();

  return (
    <Layout style={{minHeight: '100vh'}}>
      <NavMenu />
      <Layout className="site-layout app-layout">
        <AppHeader />
        <RouterView />
        <AppFooter />
      </Layout>
    </Layout>
  );
}

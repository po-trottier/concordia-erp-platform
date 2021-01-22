import React from 'react';
import {useLocation} from "react-router-dom";
import {Layout, PageHeader} from 'antd';

import {Routes} from "../../router/Routes";
import {NavMenu} from './NavMenu'
import {RouterView} from './RouterView'

const {Footer} = Layout;

export const App = () => {
  const date = new Date();
  const location = useLocation();

  // Used to determine the page title. If not page is found, we create a
  // dummy page with a "Page Not Found" title
  let notFound = Routes.find(r => r.path === location.pathname) ?? {
    path: '*',
    exact: false,
    title: 'Page Not Found',
    icon: 'DangerOutline',
    page: null,
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
      <NavMenu />
      <Layout className="site-layout app-layout">
        <PageHeader
          className="site-page-header"
          title="ERP Ultimate"
          subTitle={notFound.title}
          style={{margin: '8px 16px'}} />
        <RouterView />
        <Footer style={{textAlign: 'center'}}>
          <p style={{ marginBottom: 0 }}>Copyright ©{date.getFullYear()}</p>
          <p style={{ marginBottom: 0 }}>Created by some Concordia Students</p>
        </Footer>
      </Layout>
    </Layout>
  );
}

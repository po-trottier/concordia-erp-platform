import React from 'react';
import {useLocation} from "react-router-dom";
import {PageHeader, Avatar, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import {Routes} from "../../router/Routes";

export const AppHeader = () => {
  const location = useLocation();

  // Used to determine the page title. If not page is found, we create a
  // dummy page with a "Page Not Found" title
  const notFound = Routes.find(r => r.path === location.pathname) ?? {
    path: '*',
    exact: false,
    title: 'Page Not Found',
    icon: 'DangerOutline',
    page: null,
  };

  // TODO Replace this with a proper logout method
  const logOut = () => {
    console.log('Log out');
  }

  const dropdown = (
    <Menu>
      <Menu.Item onClick={logOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="app-header">
      <PageHeader
        className="site-page-header"
        title="ERP Ultimate"
        subTitle={notFound.title}
        style={{padding: '16px 0'}} />
        <Dropdown overlay={dropdown} trigger={['click']} placement="bottomCenter">
          <Avatar
            className="ant-dropdown-link"
            style={{ backgroundColor: '#1890ff' }}
            size="large"
            icon={<UserOutlined />} />
        </Dropdown>
    </div>
  );
}

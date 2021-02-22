import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Icon } from '@ant-design/compatible';

import { Routes } from '../../router/Routes';
import { Login } from '../../pages/Login';
import { AddUser } from '../../pages/Users/AddUser';
import Logo from '../../assets/logo.svg';

const { Sider } = Layout;

export const AppMenu = () => {
  const location = useLocation();

  return (
    <Sider
      collapsible
      breakpoint='md'
      collapsedWidth='0'>
      <img
        src={Logo}
        alt='EPIC ERP Logo'
        draggable='false'
        className='app-logo' />
      <Menu theme='dark' selectedKeys={[location.pathname]} mode='inline'>
        {Routes.filter(route => route.page !== Login && route.page !== AddUser).map((route) => (
          <Menu.Item key={route.path}>
            <Icon type={route.icon} />
            <span>{route.title}</span>
            <Link to={route.path} />
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

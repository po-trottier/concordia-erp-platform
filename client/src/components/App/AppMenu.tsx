import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Icon } from '@ant-design/compatible';

import { Routes } from '../../router/Routes';
import { Login } from '../../pages/Login';
import { AppLocationSelector } from './AppLocationSelector';
import Logo from '../../assets/logo.svg';

const { Sider } = Layout;

export const AppMenu = () => {
  const location = useLocation();

  const handleCollapse = (collapsed : boolean) => {
    const content = document.getElementById('app-content');
    if (content) {
      if (window.innerWidth >= 768) {
        content.style.marginLeft = collapsed ? '0px' : '235px';
      } else {
        content.style.marginLeft = '0px';
      }
    }
  };

  return (
    <Sider
      collapsible
      width={235}
      breakpoint='md'
      collapsedWidth='0'
      onCollapse={handleCollapse}
      style={{ height: '100vh' }}>
      <img
        src={Logo}
        alt='EPIC ERP Logo'
        draggable='false'
        className='app-logo' />
      <AppLocationSelector style={{ padding: 16 }} />
      <Menu theme='dark' selectedKeys={[location.pathname]} mode='inline'>
        {Routes.filter(route => route.page !== Login).map((route) => (
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

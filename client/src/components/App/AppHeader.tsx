import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Dropdown, Menu, message, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Routes } from '../../router/Routes';
import { RootState } from '../../store/Store';
import { logoutAction } from '../../store/slices/UserSlice';

export const AppHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state : RootState) => state.login.user);

  // Used to determine the page title. If not page is found, we create a
  // dummy page with a "Page Not Found" title
  const notFound = Routes.find(r => r.path === location.pathname) ?? {
    path: '*',
    exact: false,
    title: 'Page Not Found',
    icon: 'DangerOutline',
    page: null,
  };

  const logOut = () => {
    try {
      dispatch(logoutAction());
      history.push('/login');
    } catch (e) {
      message.error('Something went wrong while trying to log out.');
      console.error(e);
    }
  };

  const changePassword = () => {
    try {
      history.push('/changePassword');
    } catch (e) {
      message.error('Something went wrong while redirecting you to the change password page.');
      console.error(e);
    }
  };

  const dropdown = (
    <Menu>
      <Menu.Item onClick={logOut}>
        Log Out
      </Menu.Item>
      <Menu.Item onClick={changePassword}>
        Change Password
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='app-header'>
      <PageHeader
        className='site-page-header'
        title='EPIC Resource Planner'
        subTitle={notFound.title}
        style={{ padding: '16px 0' }} />
      {user.isLoggedIn &&
      <Dropdown overlay={dropdown} trigger={['click']} placement='bottomCenter'>
        <Avatar
          className='ant-dropdown-link'
          style={{ backgroundColor: '#1890ff' }}
          size='large'
          icon={<UserOutlined />} />
      </Dropdown>
      }
    </div>
  );
};

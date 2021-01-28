import React from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {PageHeader, Avatar, Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Routes} from "../../router/Routes";
import {RootState} from '../../store/Store'
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '../../store/slices/UserSlice';

export const AppHeader = () => {
  const location = useLocation();
  const history = useHistory();

  const user = useSelector((state : RootState) => state.user.user);

  const dispatch = useDispatch();

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
    dispatch(logoutAction());
    history.push('/login')
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
        title="EPIC Resource Planner"
        subTitle={notFound.title}
        style={{padding: '16px 0'}} />
      {user.isLoggedIn &&
        <Dropdown overlay={dropdown} trigger={['click']} placement="bottomCenter">
          <Avatar
            className="ant-dropdown-link"
            style={{ backgroundColor: '#1890ff' }}
            size="large"
            icon={<UserOutlined />} />
        </Dropdown>
      }
    </div>
  );
}

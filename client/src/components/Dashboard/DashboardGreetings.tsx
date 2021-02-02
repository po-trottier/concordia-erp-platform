import React from 'react';
import { List, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../store/Store';
import { Routes } from '../../router/Routes';
import { RouteGuard } from '../../router/RouteGuards';
import { Icon } from '@ant-design/compatible';

const { Title } = Typography;

export const DashboardGreetings = () => {
  const user = useSelector((state : RootState) => state.user.user);

  // Only get routes the user is allowed to see
  const routes = Routes.filter((route) => (
    route.auth.includes(user.authType) || route.auth.includes(RouteGuard.ANY)
  ));
  // Remove the dashboard from the list
  routes.shift();

  return (
    <div>
      <Title level={2}>Hello {user.name}!</Title>
      <p style={{ fontSize: 16 }}>
        Welcome to the EPIC Resource Planner.
        Here are some pages for you to visit today.
      </p>
      <List
        bordered
        dataSource={routes}
        renderItem={item => (
          <List.Item>
            <Link to={item.path} style={{ color: 'rgba(0, 0, 0, 0.85)', width: '100%' }}>
              <Icon
                style={{ color: '#1890ff', marginRight: 16 }}
                type={item.icon} />
              {item.title}
            </Link>
          </List.Item>
        )} />
    </div>
  );
};

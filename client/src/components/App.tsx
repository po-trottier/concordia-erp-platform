import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Route, Switch, Redirect, Link, useLocation} from "react-router-dom";
import {Layout, Menu, PageHeader, Card} from 'antd';
import {Icon} from '@ant-design/compatible';

import {Routes} from "../router/Routes";
import {NotFound} from '../pages/NotFound';
import {RootState} from '../app/Store';
import {toggle} from '../features/navigation/navigationSlice';
import Logo from '../assets/logo.svg';

const {Content, Footer, Sider} = Layout;

export const App = () => {
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed);
  const dispatch = useDispatch();

  const location = useLocation();

  // Used to determine the page title. If not page is found, we create a
  // dummy page with a "Page Not Found" title
  let route = Routes.find(r => r.path === location.pathname) ?? {
    path: '*',
    exact: false,
    title: 'Page Not Found',
    icon: 'DangerOutline',
    page: null,
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => dispatch(toggle())}>
        <img
          src={Logo}
          alt="Company Logo"
          draggable="false"
          style={{height: '64px', width: '100%', margin: '16px 0'}} />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
          {Routes.map((route) => (
            <Menu.Item key={route.path}>
              <Icon type={route.icon} />
              <span>{route.title}</span>
              <Link to={route.path} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          className="site-page-header"
          title="ERP Ultimate"
          subTitle={route.title}
          style={{margin: '8px 16px'}} />
        <Content style={{margin: '0 40px'}}>
          <Card>
            <div className="site-layout-background">
              <Switch>
                {Routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.page} />
                ))}
                {/* Redirect home to dashboard */}
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                {/* Redirect any invalid page to the 404 page */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </Card>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Copyright ©2021 Created by Some Students
        </Footer>
      </Layout>
    </Layout>
  );
}

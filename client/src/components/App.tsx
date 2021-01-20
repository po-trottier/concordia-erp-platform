import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Route, Switch, Redirect, Link, useLocation} from "react-router-dom";
import {Layout, Menu, PageHeader, Card} from 'antd';

import {Routes} from "../router/Routes";
import {RootState} from '../app/Store'
import {toggle} from '../features/navigation/navigationSlice'
import DynamicIcon from './DynamicIcon'
import Logo from '../assets/logo.svg';

const {Content, Footer, Sider} = Layout;

export const App = () => {
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed)
  const dispatch = useDispatch()

  const location = useLocation();

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => dispatch(toggle())}>
        <img
          src={Logo}
          alt="Company Logo"
          draggable="false"
          style={{height: '64px', width: '100%', margin: '16px 0'}} />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
          {Routes.map((route) => (
            <Menu.Item key={route.path}>
              <DynamicIcon name={route.icon} />
              <span>{route.title}</span>
              <Link to={route.path} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          className="site-page-header"
          title="Page Title"
          subTitle="Sub Title"
          style={{ margin: '8px 16px'}} />
        <Content style={{margin: '0 40px'}}>
          <Card>
            <div className="site-layout-background">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                {Routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.page} />
                ))}
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

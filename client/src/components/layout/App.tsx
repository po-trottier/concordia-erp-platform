import React from 'react';
import {Layout, Menu, Breadcrumb, PageHeader, Card} from 'antd';
import {Route, Switch, Link} from "react-router-dom";

import {Routes} from "../../router/Routes";
import Logo from '../../assets/logo.svg';

const {Content, Footer, Sider} = Layout;

export class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({collapsed});
  };

  render() {
    const {collapsed} = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <img
            src={Logo}
            alt="Company Logo"
            draggable="false"
            style={{height: '64px', width: '100%', margin: '16px 0'}} />
          {/*<Menu theme="dark" selectedKeys={[window.location.pathname]} mode="inline">*/}
          <Menu theme="dark" defaultSelectedKeys={[Routes[0].path]} mode="inline">
            {Routes.map((route) => (
              // <Menu.Item key={route.path} icon={route.icon}>
              <Menu.Item key={route.path}>
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
                  {Routes.map((route, index) => (
                    <Route key={index} path={route.path} exact={route.exact} component={route.page} />
                  ))}
                </Switch>
              </div>
            </Card>
          </Content>
          <Footer style={{textAlign: 'center'}}>Copyright ©2021 Created by Some Students</Footer>
        </Layout>
      </Layout>
    );
  }
}

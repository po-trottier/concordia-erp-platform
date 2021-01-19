import React from 'react';
import Logo from '../../assets/logo.svg';
import { Layout, Menu, Breadcrumb, PageHeader, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <img
            src={Logo}
            alt="Company Logo"
            draggable="false"
            style={{ height: '64px', width: '100%', margin: '16px 0' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              Menu 1
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Menu 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Sub Menu">
              <Menu.Item key="3">Sub 1</Menu.Item>
              <Menu.Item key="4">Sub 2</Menu.Item>
              <Menu.Item key="5">Sub 3</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <PageHeader
              className="site-page-header"
              title="Page Title"
              subTitle="Sub Title"
              style={{ padding: '16px 0' }} />
            <Breadcrumb style={{ margin: '4px 0 16px 0' }}>
              <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
              <Breadcrumb.Item>Current</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
              <div className="site-layout-background">
                Page content
              </div>
            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright ©2021 Created by Some Students</Footer>
        </Layout>
      </Layout>
    );
  }
}
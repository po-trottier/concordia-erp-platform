import React, { useState } from "react";
import { Layout, Card, Table, Space, Tabs } from 'antd';
import { LineChartOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';
import { Menu } from 'antd';
import { bicycle } from '../interfaces/Bicycle';

const { TabPane } = Tabs;
 

const data : bicycle[] =  [
    {
      key: '1',
      name: 'Mongoose Legion L100 BMX 20inch wheel 2020 Blue',
      description: '10 Downing Street',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 17,
      price: 99.99,
    },
    {
      key: '2',
      name: 'Women\'s Newport 3SPD Grey',
      description: '10 Downing Street',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 32,
      price: 119.99,
    },
    {
      key: '3',
      name: 'Gallium Pro Disc',
      description: 'Destined for glory',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 17,
      price: 299.99,
    },
    {
      key: '4',
      name: 'Krypton Pro',
      description: 'A road-hungry endurance bike with the will to win',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 32,
      price: 199.99,
    },
    {
      key: '5',
      name: 'Xenon 650',
      description: 'Our popular junior racing bike',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 17,
      price: 399.99,
    },
    {
      key: '6',
      name: 'Subito E-Gravel',
      description: 'Already looking for the next great escape',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 32,
      price: 199.99,
    },
    {
      key: '7',
      name: 'Nitrogen Disc',
      description: 'Made for those who want to cheat the wind',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 17,
      price: 299.99,
    },
    {
      key: '8',
      name: 'Dark Matter',
      description: 'Go way off the beaten path',
      parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
      quantity: 32,
      price: 599.99,
    },
];

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ["sm"] as Breakpoint[],
      render: function displayProduct(text : any) {
        return <a>{text}</a>;
      } 
    },
    {
      title: 'Price (CAD)',
      dataIndex: 'price',
      key: 'price',
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ["sm"] as Breakpoint[]
    },
];

const inventory = (
  <Card style={{ marginTop: '20px' }}>
    <Table dataSource={data} columns={columns}></Table>
  </Card>
);




export const Products = () => {
  const [productState, setProductState] = useState("inventory");

  let updateState = (e: any) => {
    setProductState(e.key);
  };

  let switchTabs = () => {
    switch (productState) {
      case "inventory":
        return inventory;
      case "trends":
        return <h1>Hello from trends</h1>;
      default:
        return inventory;
    }
  };

  return (
        <div>
          <Menu onClick={updateState} mode="horizontal">
            <Menu.Item icon={<DatabaseOutlined />} key="inventory" >
              Inventory
            </Menu.Item>
            <Menu.Item icon={<LineChartOutlined />} key="trends">
              Trends
            </Menu.Item>
          </Menu>
          {switchTabs()}
        </div>
    );
} 

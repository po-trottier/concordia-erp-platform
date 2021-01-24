import React from "react";

import { Table, Menu } from 'antd'
import { NotificationTwoTone, DollarCircleTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;
export const Finances = () => {
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

  return(
  <React.Fragment>
      <h1>Finances</h1>
     <Menu mode="horizontal">
        <Menu.Item key="summary" icon={<NotificationTwoTone/>}>
          <Table dataSource={dataSource} columns={columns} />;
        </Menu.Item>
        <Menu.Item key="income" icon={<DollarCircleTwoTone twoToneColor="#52c41a"/>}>
          Income
        </Menu.Item>
        <Menu.Item key="expenses" icon={<DollarCircleTwoTone twoToneColor="#eb2f96"/>}>
          Expenses
        </Menu.Item>
     </Menu>
  </React.Fragment>
  )
}

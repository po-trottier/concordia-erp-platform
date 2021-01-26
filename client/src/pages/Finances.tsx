import React, {useState} from "react";

import {Summary} from '../components/Summary'
import {Income} from '../components/Income'
import {Expenses} from '../components/Expenses'
import { Table, Menu } from 'antd'
import { NotificationTwoTone, DollarCircleTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;
export const Finances = () => {
  const [tableState, setTableState] = useState("summary");
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

  let updateState = (e : any) => {
    setTableState(e.key)
  };

  let renderTable = () => {
    if(tableState == "summary")
    {
      console.log("summary")
      return <Summary/>
    }
    else if(tableState == "income")
    {
      console.log("income")
      return <Income/>
    }
    else if(tableState == "expenses")
    {
      console.log("expenses")
      return <Expenses/>
    }
    else {
      console.log("fuck")
      return <Summary/>
    }
  }

  return(
  <React.Fragment>
     <h1>Finances</h1>
     <Menu onClick={updateState} mode="horizontal">
        <Menu.Item key="summary" icon={<NotificationTwoTone/>}>
          Summary
        </Menu.Item>
        <Menu.Item key="income" icon={<DollarCircleTwoTone twoToneColor="#52c41a"/>}>
          Income
        </Menu.Item>
        <Menu.Item key="expenses" icon={<DollarCircleTwoTone twoToneColor="#eb2f96"/>}>
          Expenses
        </Menu.Item>
     </Menu>
    {renderTable()}
  </React.Fragment>
  )
}

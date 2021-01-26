import React, {useState} from "react";

import {Summary} from '../components/Finance/Summary'
import {Income} from '../components/Finance/Income'
import {Expenses} from '../components/Finance/Expenses'
import { Table, Menu } from 'antd'
import { NotificationTwoTone, DollarCircleTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;
export const Finances = () => {
  const [tableState, setTableState] = useState("summary");

  let updateState = (e : any) => {
    setTableState(e.key)
  };

  let renderTable = () => {
    switch(tableState)
    {
      case "summary":
        return <Summary/>
        break;
      case "income":
        return <Income/>
        break;
      case "expenses":
        return <Expenses/>
        break;
      default:
        return <Summary/>
        break;
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

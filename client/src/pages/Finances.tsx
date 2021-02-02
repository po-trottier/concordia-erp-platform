import React, {useState} from "react";
import {Menu} from 'antd';
import {NotificationTwoTone, DollarCircleTwoTone} from '@ant-design/icons';

import {Summary} from '../components/Finance/Summary';
import {Income} from '../components/Finance/Income';
import {Expenses} from '../components/Finance/Expenses';

export const Finances = () => {
  const [tableState, setTableState] = useState("summary");

  let updateState = (e : any) => {
    setTableState(e.key);
  };

  let renderSection = () => {
    switch(tableState) {
      case "summary":
        return <Summary />
      case "income":
        return <Income />
      case "expenses":
        return <Expenses />
      default:
        return <Summary />
    }
  }

  return(
    <div>
      <Menu onClick={updateState} defaultSelectedKeys={['summary']} mode="horizontal" style={{ marginBottom: '16px' }}>
        <Menu.Item key="summary" icon={<NotificationTwoTone />}>
          Summary
        </Menu.Item>
        <Menu.Item key="income" icon={<DollarCircleTwoTone twoToneColor="#52c41a" />}>
          Income
        </Menu.Item>
        <Menu.Item key="expenses" icon={<DollarCircleTwoTone twoToneColor="#eb2f96" />}>
          Expenses
        </Menu.Item>
      </Menu>
      {renderSection()}
    </div>
  )
}

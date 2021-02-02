import React, { useState } from 'react';
import { Menu } from 'antd';
import { DollarCircleTwoTone, NotificationTwoTone } from '@ant-design/icons';

import { Summary } from '../components/Finance/Summary';
import { Income } from '../components/Finance/Income';
import { Expenses } from '../components/Finance/Expenses';

export const Finances = () => {
  const [sectionState, setSectionState] = useState('summary');

  let updateState = (e : any) => {
    setSectionState(e.key);
  };

  let renderSection = () => {
    switch (sectionState) {
      case 'summary':
        return <Summary />;
      case 'income':
        return <Income />;
      case 'expenses':
        return <Expenses />;
      default:
        return <Summary />;
    }
  };

  return (
    <div>
      <Menu onClick={updateState} defaultSelectedKeys={['summary']} mode='horizontal' style={{ marginBottom: '16px' }}>
        <Menu.Item key='summary' icon={<NotificationTwoTone />}>
          Summary
        </Menu.Item>
        <Menu.Item key='income' icon={<DollarCircleTwoTone twoToneColor='#52c41a' />}>
          Income
        </Menu.Item>
        <Menu.Item key='expenses' icon={<DollarCircleTwoTone twoToneColor='#eb2f96' />}>
          Expenses
        </Menu.Item>
      </Menu>
      {renderSection()}
    </div>
  );
};

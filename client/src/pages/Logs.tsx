import React, { useState } from 'react';
import { Menu } from 'antd';
import { FunnelPlotTwoTone, SafetyCertificateTwoTone, CloudTwoTone } from '@ant-design/icons';

import { Audit } from '../components/Logs/Audit';
import { LogList } from '../components/Logs/LogList';
import { Cloud } from '../components/Logs/Cloud';

export const Logs = () => {

  const [tableState, setTableState] = useState('summary');

  let updateState = (e : any) => {
    setTableState(e.key);
  };

  let renderSection = () => {
    switch (tableState) {
      case 'audit':
        return <Audit />;
      case 'logs':
        return <LogList />;
      case 'cloud':
        return <Cloud />;
      default:
        return <Audit />;
    }
  };

  return (
    <div>
      <Menu onClick={updateState} defaultSelectedKeys={['audit']} mode='horizontal'>
        <Menu.Item key='audit' icon={<FunnelPlotTwoTone twoToneColor='#52c41a' />}>
          Audit
        </Menu.Item>
        <Menu.Item key='logs' icon={<SafetyCertificateTwoTone twoToneColor='#eb2f96' />}>
          All Logs
        </Menu.Item>
        <Menu.Item key='cloud' icon={<CloudTwoTone />}>
          Cloud
        </Menu.Item>
      </Menu>
      {renderSection()}
    </div>
  );
};
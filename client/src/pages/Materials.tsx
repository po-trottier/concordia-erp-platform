import React, { useState } from 'react';

import { MaterialsTimeline } from '../components/Materials/MaterialsTimeline';
import { MaterialsList } from '../components/Materials/MaterialsList';
import { Menu } from 'antd';
import { DollarCircleTwoTone, NotificationTwoTone } from '@ant-design/icons';

export const Materials = () => {
  const [tableState, setTableState] = useState('summary');

  let updateState = (e : any) => {
    setTableState(e.key);
  };

  let renderSection = () => {
    switch (tableState) {
      case 'inventory':
        return <MaterialsTimeline />;
      case 'catalog':
        return <MaterialsList />;
      default:
        return <MaterialsTimeline />;
    }
  };

  return (
    <div>
      <Menu onClick={updateState} defaultSelectedKeys={['inventory']} mode='horizontal'
            style={{ marginBottom: '16px' }}>
        <Menu.Item key='inventory' icon={<NotificationTwoTone />}>
          Inventory
        </Menu.Item>
        <Menu.Item key='catalog' icon={<DollarCircleTwoTone twoToneColor='#52c41a' />}>
          Catalog
        </Menu.Item>
      </Menu>
      {renderSection()}
    </div>
  );
};

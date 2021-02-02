import React, { useState } from 'react';
import { Menu } from 'antd';
import { BookTwoTone, ContainerTwoTone } from '@ant-design/icons';

import { MaterialsInventory } from '../components/Materials/MaterialsInventory';
import { MaterialsCatalog } from '../components/Materials/MaterialsCatalog';

export const Materials = () => {
  const [tableState, setTableState] = useState('summary');

  let updateState = (e : any) => {
    setTableState(e.key);
  };

  let renderSection = () => {
    switch (tableState) {
      case 'inventory':
        return <MaterialsInventory />;
      case 'catalog':
        return <MaterialsCatalog />;
      default:
        return <MaterialsInventory />;
    }
  };

  return (
    <div>
      <Menu onClick={updateState} defaultSelectedKeys={['inventory']} mode='horizontal'
            style={{ marginBottom: '16px' }}>
        <Menu.Item key='inventory' icon={<ContainerTwoTone />}>
          Inventory
        </Menu.Item>
        <Menu.Item key='catalog' icon={<BookTwoTone twoToneColor='#52c41a' />}>
          Catalog
        </Menu.Item>
      </Menu>
      {renderSection()}
    </div>
  );
};

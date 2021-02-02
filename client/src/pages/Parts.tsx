import React, { useState } from 'react';
import { Menu } from 'antd';
import { BookTwoTone, ContainerTwoTone } from '@ant-design/icons';

import { PartInventory } from '../components/Parts/PartInventory';
import { PartCatalog } from '../components/Parts/PartCatalog';

export const Parts = () => {
  const [tableState, setTableState] = useState('inventory');

  let updateState = (e : any) => {
    setTableState(e.key);
  };

  let renderSection = () => {
    switch (tableState) {
      case 'inventory':
        return <PartInventory />;
      case 'catalog':
        return <PartCatalog />;
      default:
        return <PartInventory />;
    }
  };

  return (
    <div>
      <Menu
        onClick={updateState}
        defaultSelectedKeys={['inventory']}
        mode='horizontal'
        style={{ marginBottom: '24px' }}>
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

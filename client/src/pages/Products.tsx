import React, { useState } from 'react';
import { BookTwoTone, ContainerTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';

import { ProductInventory } from '../components/Products/ProductInventory';
import { ProductCatalog } from '../components/Products/ProductCatalog';

export const Products = () => {
  const [productState, setProductState] = useState('inventory');

  let updateTableState = (e : any) => {
    setProductState(e.key);
  };

  let switchTabs = () => {
    switch (productState) {
      case 'inventory':
        return <ProductInventory />;
      case 'catalog':
        return <ProductCatalog />;
      default:
        return <ProductInventory />;
    }
  };

  return (
    <div>
      <Menu defaultSelectedKeys={['inventory']} onClick={updateTableState} mode='horizontal'>
        <Menu.Item key='inventory' icon={<ContainerTwoTone />}>
          Inventory
        </Menu.Item>
        <Menu.Item key='catalog' icon={<BookTwoTone twoToneColor='#52c41a' />}>
          Catalog
        </Menu.Item>
      </Menu>
      {switchTabs()}
    </div>
  );
};

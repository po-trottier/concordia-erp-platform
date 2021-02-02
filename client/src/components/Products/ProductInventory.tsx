import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/charts';

import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';

export const ProductInventory = () => {
  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Line
          data={dummyData.lineData}
          xField='date'
          yField='numberSold' />
      </Card>
      <Card>
        <ResponsiveTable rows={dummyData.getRows()} cols={dummyData.getInventoryColumns()} />
      </Card>
    </div>
  );
};
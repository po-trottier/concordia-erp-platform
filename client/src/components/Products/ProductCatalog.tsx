import React from 'react';
import { Button, Card } from 'antd';

import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';

export const ProductCatalog = () => {

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <ResponsiveTable rows={dummyData.getRows()} cols={dummyData.getCatalogColumns()} />
      </Card>
      <Button type='ghost'>
        Add Product
      </Button>
      <Button type='primary' style={{ float: 'right' }}>
        Build Product
      </Button>
    </div>
  );
};

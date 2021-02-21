import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';

import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';

const { Search } = Input;

export const ProductInventory = () => {
  const [tableData, setTableData] = useState(dummyData.getLineData());
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = dummyData.getLineData();
    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    setTableData(rows);
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        <Line
          data={tableData}
          xField='date'
          yField='quantity'
          seriesField='name' />
      </Card>
      <Card>
        <ResponsiveTable
          rows={tableData}
          cols={dummyData.getInventoryColumns()} />
      </Card>
    </div>
  );
};

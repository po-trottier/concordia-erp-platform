import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';

import { ResponsiveTable } from '../ResponsiveTable';
import { dummyPartData, dummyPartHistoryData } from './PartDummyData';

const { Search } = Input;

export const PartInventory = () => {

  const [lineGraphData, setLineGraphData] = useState(dummyPartHistoryData());
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let data = dummyPartData;
    let timeLineData : any[] = dummyPartHistoryData();
    if (searchValue) {
      data = data.filter(
        (part) =>
          part.name.toLowerCase().includes(searchValue) ||
          part.description.toLowerCase().includes(searchValue) ||
          part.id.includes(searchValue)
      );
      timeLineData = [];
      data.forEach(({ id: partId }) => {
        timeLineData.push(
          ...dummyPartHistoryData().filter(({ id }) => id === partId)
        );
      });
    }
    setLineGraphData(timeLineData);
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchValue(value);
  };

  const cols = {
    name: 'Part',
    date: 'Date',
    built: 'Built',
    used: 'Used',
    quantity: 'Stock',
  };

  return (
    <div>
      <Card style={{ marginBottom: '24px' }}>
        <Search
          placeholder='Search for part transaction'
          onChange={onSearch}
          style={{ marginBottom: 16 }} />
        <Line
          data={lineGraphData}
          xField='date'
          yField='quantity'
          seriesField='name' />
      </Card>
      <Card>
        <ResponsiveTable cols={cols} rows={lineGraphData} />
      </Card>
    </div>
  );
};

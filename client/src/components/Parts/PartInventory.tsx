import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';

import { ResponsiveTable } from '../ResponsiveTable';
import { dummyPartData, dummyPartHistoryData } from './PartDummyData';

const { Search } = Input;

export const PartInventory = () => {

  const [lineGraphData, setLineGraphData] = useState(dummyPartHistoryData);
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState(dummyPartData);

  useEffect(() => {
    let data = dummyPartData;
    let timeLineData : any[] = dummyPartHistoryData;
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
          ...dummyPartHistoryData.filter(({ id }) => id === partId)
        );
      });
    }
    setLineGraphData(timeLineData);
    setTableData(data);
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchValue(value);
  };

  const cols = {
    name: 'Part',
    description: 'Description',
    quantity: 'Quantity',
    forecast: 'Forecast',
  };

  return (
    <div>
      <Card style={{ marginBottom: '24px' }}>
        <Search
          placeholder='Search for part'
          onChange={onSearch}
          style={{ marginBottom: 16 }} />
        <Line
          data={lineGraphData}
          xField='date'
          yField='quantity'
          seriesField='name' />
      </Card>
      <Card>
        <ResponsiveTable cols={cols} rows={tableData} />
      </Card>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import axios from '../../plugins/Axios'
import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';
import {ProductHistoryEntry} from "../../interfaces/ProductHistoryEntry";

const { Search } = Input;

const inventoryColumns = {
  name: 'Name',
  date: 'Date',
  built: 'Built',
  sold: 'Sold',
  quantity: 'Stock',
};

export const ProductInventory = () => {
  const emptyData : ProductHistoryEntry[] = [];
  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5TbWl0aDE5NjUiLCJpZCI6IjYwMmMzN2ZjNTMzMGM2NDQwNzdlNmVlZSIsInJvbGVzIjo0LCJpYXQiOjE2MTM1MTA3NzEsImV4cCI6MTY0NTA0Njc3MX0.xZkFNVbyAls43uga3IcAYT3JA9yVZc267_k6--NYw4g'}

  useEffect(() => {
    axios.get('products/logs').then(({data}) => {
      data.forEach((row: any) => {
        row.date = new Date(row.date).toLocaleDateString();
        // Once naming conventions are finalized: perhaps just fucking rename 'stock' to 'quantity' in the product-log schema or vice versa
        row.quantity = row.stock;
      });

      data.sort((a: any, b: any) => {
        const dateA = a.date;
        const dateB = b.date;
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      });

      if (searchValue.trim() !== '') {
        data = data.filter(
           (row: any) => row.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
      }
      setTableData(data);
    });
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
          cols={inventoryColumns} />
      </Card>
    </div>
  );
};

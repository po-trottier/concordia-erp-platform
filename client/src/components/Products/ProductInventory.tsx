import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import axios from '../../plugins/Axios'
import { ResponsiveTable } from '../ResponsiveTable';
import {ProductHistoryEntry} from "../../interfaces/ProductHistoryEntry";

const { Search } = Input;

const inventoryColumns = {
  name: 'Name',
  date: 'Date',
  built: 'Built',
  sold: 'Sold',
  stock: 'Stock',
};

export const ProductInventory = () => {
  const emptyData : ProductHistoryEntry[] = [];
  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('products/logs').then(async ({data}) => {
      for (let i = 0 ; i < data.length ; i ++) {
        let row = data[i];
        row.date = new Date(row.date).toLocaleDateString(); 
        // this is highly inefficient
        row.name = await axios.get('products/'+ row.productId).then(({data}) => {
          return data.name;
        })
      }

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
          yField='stock'
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

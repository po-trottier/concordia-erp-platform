import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';
import axios from '../../plugins/Axios'
import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';

const { Search } = Input;

export const ProductCatalog = () => {
  const [tableData, setTableData] = useState(dummyData.getRows());
  const [searchValue, setSearchValue] = useState('');

  axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5TbWl0aDE5NjUiLCJpZCI6IjYwMmMzN2ZjNTMzMGM2NDQwNzdlNmVlZSIsInJvbGVzIjo0LCJpYXQiOjE2MTM1MTA3NzEsImV4cCI6MTY0NTA0Njc3MX0.xZkFNVbyAls43uga3IcAYT3JA9yVZc267_k6--NYw4g'}

  useEffect(() => {
    axios.get('products').then(({data}) => {
      console.log(data);
    })

    let rows = dummyData.getRows();
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
        <ResponsiveTable rows={tableData} cols={dummyData.getCatalogColumns()} />
      </Card>
      <Button type='ghost'>
        Define a new Product
      </Button>
      <Button type='primary' style={{ float: 'right' }}>
        Build Products
      </Button>
    </div>
  );
};

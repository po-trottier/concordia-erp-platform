import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, Modal } from 'antd';
import axios from '../../plugins/Axios'
import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';
import {BicycleEntry} from '../../interfaces/BicycleEntry';
import ProductDetails from './ProductDetails';

const { Search } = Input;

const showModal = (row : any) => {
  Modal.info({
    onOk() {
    },
    title: 'Product Details',
    width: 500,
    content: (
      <ProductDetails
        name={row.name}
        price={row.price}
        quantity={row.quantity}
        frameSize={row.frameSize}
        parts={row.parts.join(', ')}
        color={row.color}
        finish={row.finish}
        grade={row.grade}
        description={row.description} />
    )
  });
};

export const ProductCatalog = () => {
  const emptyData : BicycleEntry[] = [];
  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG5TbWl0aDE5NjUiLCJpZCI6IjYwMmMzN2ZjNTMzMGM2NDQwNzdlNmVlZSIsInJvbGVzIjo0LCJpYXQiOjE2MTM1MTA3NzEsImV4cCI6MTY0NTA0Njc3MX0.xZkFNVbyAls43uga3IcAYT3JA9yVZc267_k6--NYw4g'}

  useEffect(() => {
    axios.get('products').then(({data}) => {
      data.forEach((row: any) => {
        row.details = (
          <Button type='ghost' onClick={() => showModal(row)}>
            See Details
          </Button>
        );

        row.build = <InputNumber
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }}
        />;
      });
      console.log(data);
      setTableData(data);
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

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, Modal } from 'antd';
import axios from '../../plugins/Axios'
import { ResponsiveTable } from '../ResponsiveTable';
import {BicycleEntry} from '../../interfaces/BicycleEntry';
import ProductDetails from './ProductDetails';
import { CreateProductModal } from './CreateProductModal';

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

const catalogColumns = {
  name: 'Name',
  details: 'Details',
  quantity: 'Owned',
  price: 'Price',
  build: 'Build'
}

export const ProductCatalog = () => {
  const emptyData : BicycleEntry[] = [];
  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

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
        <ResponsiveTable rows={tableData} cols={catalogColumns} />
      </Card>
      <Button type='primary' style={{ marginTop: 16, float: 'right' }}>
        Build Products
      </Button>
      <CreateProductModal />
    </div>
  );
};

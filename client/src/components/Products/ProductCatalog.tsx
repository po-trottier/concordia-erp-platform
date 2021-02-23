import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ResponsiveTable } from '../ResponsiveTable';
import ProductDetails from './ProductDetails';
import { ProductEditModal } from './ProductEditModal';
import { BicycleEntry } from '../../interfaces/BicycleEntry';
import { CreateProductModal } from './CreateProductModal';
import axios from '../../plugins/Axios';


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

const showDeleteConfirmModal = () => {
  Modal.confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {},
    onCancel() {},
  });
}

const catalogColumns = {
  name: 'Name',
  details: 'Details',
  quantity: 'Owned',
  price: 'Price',
  build: 'Build',
  actions: 'Actions'
}

export const ProductCatalog = () => {
  const emptyData : BicycleEntry[] = [];
  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  const submitEditHandler = (values: any) => {
    console.log(values);
  }

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

        row.actions = 
      <>
        <ProductEditModal
          name={row.name}
          price={row.price}
          frameSize={row.frameSize}
          parts={row.parts.join(', ')}
          color={row.color}
          finish={row.finish}
          grade={row.grade} 
          submitEditHandler = {submitEditHandler}/>
          <Button type='ghost' danger style={{marginLeft:10}} onClick={showDeleteConfirmModal}>Delete</Button>
      </>
      });
      if (searchValue.trim() !== '') {
        data = data.filter(
           (row: any) => row.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
      }
      setTableData(data);
    });
  }, [searchValue]);

  useEffect(() => {

  })

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

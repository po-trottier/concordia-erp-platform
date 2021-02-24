import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, message, Modal } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { CreateProductModal } from './CreateProductModal';
import { EditProductModal } from './EditProductModal';
import { ProductEntry } from '../../interfaces/ProductEntry';
import ProductDetails from './ProductDetails';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const ProductCatalog = () => {

  const emptyData : ProductEntry[] = []
  const [tableData, setTableData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // TODO Replace this with redux
  const [products, setProducts] = useState(emptyData);

  useEffect(() => {
    getProducts()
      .then((rows) => {
        if (searchValue.trim() !== '') {
          rows = rows.filter(
            (r : ProductEntry) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
        }
        setTableData(rows);
      })
      .catch((err) => {
        message.error('Something went wrong while getting the products catalog.');
        console.error(err);
      });
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getProducts = async () => {
    let res;
    if (!updated) {
      res = await axios.get('/products');
      if (!res) {
        message.error('Something went wrong while getting the products catalog.');
        return [];
      }
    } else {
      // TODO Replace this with redux
      return products
    }
    const rows = res.data;
    rows.forEach((row : any) => {
      row.id = row['_id'];
      row.details = (
        <Button type='primary' size='small' onClick={() => showModal(row)}>
          See Details
        </Button>
      );
      row.build = (
        <InputNumber
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }}/>
      );
      row.actions = (
        <EditProductModal product={row} />
      );
    });
    // TODO Replace this with redux
    setProducts(rows);
    setUpdated(true);
    return rows;
  }

  const showModal = (row : any) => {
    // TODO Fix this Modal
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

  const columns = {
    name: 'Name',
    details: 'Details',
    price: 'Price',
    quantity: 'Stock',
    actions: 'Actions',
    build: 'Build'
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          tableData.length > 0 ?
          <ResponsiveTable rows={tableData} cols={columns} /> :
            <span>No products were found.</span>
        }
      </Card>
      <Button type='primary' style={{ marginTop: 16, float: 'right' }}>
        Build Products
      </Button>
      <CreateProductModal />
    </div>
  );
};

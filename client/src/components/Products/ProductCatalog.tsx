import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ResponsiveTable } from '../ResponsiveTable';
import { CreateProductModal } from './CreateProductModal';
import { EditProductModal } from './EditProductModal';
import { ProductDetails } from './ProductDetails';
import { RootState } from '../../store/Store';
import { ProductEntry } from '../../interfaces/ProductEntry';
import { ProductStockEntry } from '../../interfaces/ProductStockEntry';
import { setProductList } from '../../store/slices/ProductListSlice';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const ProductCatalog = () => {
  const dispatch = useDispatch();

  const products = useSelector((state : RootState) => state.productList.list);
  const updated = useSelector((state : RootState) => state.productList.updated);
  const location = useSelector((state : RootState) => state.location.selected);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/products')
      .then(({ data }) => {
        data.forEach((p : any) => {
          p.id = p._id;
        });
        axios.get('/products/stock/' + location)
          .then((resp) => {
            data.forEach((prod : ProductEntry) => {
              const entry = resp.data.find((p : ProductStockEntry) => p.productId === prod.id);
              if (entry) {
                prod.stock = entry.stock;
              } else {
                prod.stock = 0;
              }
            });
            dispatch(setProductList(data));
          })
          .catch((err) => {
            message.error('Something went wrong while getting the products stock.');
            console.error(err);
          });
      })
      .catch((err) => {
        message.error('Something went wrong while getting the products catalog.');
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, location]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getProducts = () => {
    let rows = JSON.parse(JSON.stringify(products));

    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r : ProductEntry) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }

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
          style={{ width: '100%' }} />
      );
      row.actions = (
        <EditProductModal product={row} />
      );
    });

    rows.sort((a : ProductEntry, b : ProductEntry) => {
      return a.name < b.name ? -1 : 1;
    });

    return rows;
  };

  const showModal = (row : ProductEntry) => {
    Modal.info({
      title: 'Product Details',
      content: <ProductDetails product={row} />
    });
  };

  const columns = {
    name: 'Name',
    details: 'Details',
    price: 'Price',
    stock: 'Stock',
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
          getProducts().length > 0 ?
            <ResponsiveTable rows={getProducts()} cols={columns} /> :
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

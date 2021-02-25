import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Button, Card, Input, InputNumber, Modal } from 'antd';
import axios from '../../plugins/Axios'
=======
import { Button, Card, Input, InputNumber, message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

>>>>>>> main
import { ResponsiveTable } from '../ResponsiveTable';
import {ProductEntry} from '../../interfaces/ProductEntry';
import ProductDetails from './ProductDetails';
import { CreateProductModal } from './CreateProductModal';
<<<<<<< HEAD

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
  const emptyData : ProductEntry[] = [];
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
=======
import { EditProductModal } from './EditProductModal';
import { ProductDetails } from './ProductDetails';
import { ProductEntry } from '../../interfaces/ProductEntry';
import { RootState } from '../../store/Store';
import { setProductList } from '../../store/slices/ProductListSlice';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const ProductCatalog = () => {
  const dispatch = useDispatch();

  const products = useSelector((state : RootState) => state.productList.list);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/products')
      .then(({ data }) => {
        dispatch(setProductList(data));
      })
      .catch((err) => {
        message.error('Something went wrong while getting the products catalog.');
        console.error(err);
      });
  }, [searchValue, products]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getProducts = () => {
    let rows = JSON.parse(JSON.stringify(products));

    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r : ProductEntry) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
>>>>>>> main

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
  }

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
<<<<<<< HEAD
        <ResponsiveTable rows={tableData} cols={catalogColumns} />
=======
        {
          getProducts().length > 0 ?
          <ResponsiveTable rows={getProducts()} cols={columns} /> :
            <span>No products were found.</span>
        }
>>>>>>> main
      </Card>
      <Button type='primary' style={{ marginTop: 16, float: 'right' }}>
        Build Products
      </Button>
      <CreateProductModal />
    </div>
  );
};

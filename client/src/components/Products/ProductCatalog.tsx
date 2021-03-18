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
import { ProductManuOrderItem } from '../../interfaces/ProductManuOrderItem';
import { setProductList } from '../../store/slices/ProductListSlice';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const ProductCatalog = () => {
  const dispatch = useDispatch();

  const products = useSelector((state : RootState) => state.productList.list);
  const updated = useSelector((state : RootState) => state.productList.updated);
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData: ProductManuOrderItem[] = [];
  const [searchValue, setSearchValue] = useState('');
  const [productOrders, setProductOrders] = useState(emptyData);

  useEffect(() => {
    axios.get('/products')
      .then(({ data }) => {
        data.forEach((p : any) => {
          p.id = p._id;
        });
        axios.get('/products/stock/' + location)
          .then((resp) => {
            const tempOrders: ProductManuOrderItem[] = [];
            data.forEach((prod : ProductEntry) => {
              tempOrders.push({ productId: prod.id, buildAmount: 0 })
              const entry = resp.data.find((p : ProductStockEntry) => p.productId === prod.id);
              if (entry) {
                prod.stock = entry.stock;
              } else {
                prod.stock = 0;
              }
            });
            setProductOrders(tempOrders);
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
  // eslint-disable-next-line
  }, [updated, location]);

  const updateProductStocks = (response: any) => {
    const clone = JSON.parse(JSON.stringify(products));
    response.data.forEach((updatedProductLocationStock: any) => {
      const foundClone = clone.find((clone: any) => clone.id === updatedProductLocationStock.productId._id);
      foundClone.stock = updatedProductLocationStock.stock;
    });
    dispatch(setProductList(clone));
  }

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const changeBuildAmount = (productId: string, buildAmount: number) => {
    const foundOrder = productOrders.find(
      (order: ProductManuOrderItem) => order.productId === productId
    );
    if (foundOrder) {
      foundOrder.buildAmount = buildAmount;
      setProductOrders(productOrders);
    } else {
      setProductOrders(productOrders.concat({ productId, buildAmount }));
    }
  };

  const getProducts = () => {
    let rows = JSON.parse(JSON.stringify(products));

    if (searchValue.trim() !== '') {
      rows = rows.filter((r: ProductEntry) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    rows.forEach((row : any) => {
      row.id = row['_id'];
      row.details = (
        <Button type='primary' size='small' onClick={() => showModal(row)}>
          See Details
        </Button>
      );
      const productOrder = productOrders.find((p) => p.productId === row.id);
      row.build = (
        <InputNumber
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }}
          value={productOrder ? productOrder.buildAmount : 0}
          onChange={(v) => updateQuantity(row.id, v)} />
      );
      row.actions = <EditProductModal product={row} />;
    });

    rows.sort((a: ProductEntry, b: ProductEntry) => {
      return a.name < b.name ? -1 : 1;
    });
    return rows;
  };

  const updateQuantity = (id: string, val: any) => {
    debugger;
    const clone = JSON.parse(JSON.stringify(productOrders));
    const productOrder = clone.find((p : ProductManuOrderItem) => p.productId === id);
    productOrder.buildAmount = val;
    setProductOrders(clone);
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
    build: 'Build',
  };

  const buildProducts = () => {
    axios.patch('products/build/' + location, productOrders)
    .then((data) => {
      updateProductStocks(data);
      message.success('The products were built successfully.');
    }).catch((err) => {
      message.error('There are not enough parts to build the products.');
      console.log(err);
    });
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
            <ResponsiveTable values={getProducts()} columns={columns} /> :
            <span>No products were found.</span>
        }
      </Card>
      <Button
        onClick={buildProducts}
        type='primary'
        style={{ marginTop: 16, float: 'right' }}>
        Build Products
      </Button>
      <CreateProductModal />
    </div>
  );
};

import React, { HTMLProps, useEffect, useState } from 'react';
import { Button, InputNumber, message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setProductList } from '../../store/slices/ProductListSlice';
import { setCustomerList } from '../../store/slices/CustomerListSlice';
import { RootState } from '../../store/Store';
import { ProductSale } from '../../interfaces/ProductSale';
import { ProductEntry } from '../../interfaces/ProductEntry';
import { ProductStockEntry } from '../../interfaces/ProductStockEntry';
import { ProductOrderItem } from '../../interfaces/ProductOrderItem';
import { ResponsiveTable } from '../ResponsiveTable';
import { ProductOrder } from '../../interfaces/ProductOrder';
import { CustomerEntry } from '../../interfaces/CustomerEntry';
import axios from '../../plugins/Axios';

interface CustomProps extends HTMLProps<HTMLDivElement> {
  customerId: string
}

export const SellProductModal = (props : CustomProps) => {
  const { customerId, ...rest } = props;

  const dispatch = useDispatch();

  const customers = useSelector((state : RootState) => state.customerList.list);
  const products = useSelector((state : RootState) => state.productList.list);
  const updated = useSelector((state : RootState) => state.productList.updated);
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData : ProductSale[] = [];
  const [quantities, setQuantities] = useState(emptyData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/products')
      .then(({ data }) => {
        data.forEach((p : any) => {
          p.id = p._id;
        });
        getProductStock(data);
      })
      .catch((err) => {
        message.error('Something went wrong while getting the products catalog.');
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, location]);

  const getProductStock = (products : ProductEntry[]) => {
    axios.get('/products/stock/' + location)
      .then((resp) => {
        const tempQuantities : ProductSale[] = [];
        products.forEach((product) => {
          tempQuantities.push({ id: product.id, quantity: 0 });
          const entry = resp.data.find((p : ProductStockEntry) => p.productId === product.id);
          if (entry) {
            product.stock = entry.stock;
          } else {
            product.stock = 0;
          }
        });
        setQuantities(tempQuantities);
        dispatch(setProductList(products));
      })
      .catch((err) => {
        message.error('Something went wrong while getting the products stock.');
        console.error(err);
      });
  }

  const getProducts = () => {
    let rows = JSON.parse(JSON.stringify(products));
    rows.forEach((row : any) => {
      const q = quantities.find((e) => e.id === row.id);
      row.id = row['_id'];
      row.order = (
        <InputNumber
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }}
          value={q ? q.quantity : 0}
          onChange={(v) => updateQuantity(row.id, v)} />
      );
    });
    rows.sort((a : ProductEntry, b : ProductEntry) => {
      return a.name < b.name ? -1 : 1;
    });
    return rows;
  };

  const updateQuantity = (id: string, val: any) => {
    const clone = JSON.parse(JSON.stringify(quantities));
    const sale = clone.find((e : ProductSale) => e.id === id);
    sale.quantity = val;
    setQuantities(clone);
  };

  const sellProducts = () => {
    let error: any = null;
    const body: ProductOrderItem[] = [];
    quantities.forEach((q) => {
      if (q.quantity <= 0 || error) {
        return;
      }
      const product = products.find((p : ProductEntry) => p.id === q.id);
      if (q.quantity > product.stock) {
        error = product;
        return;
      }
      body.push({
        locationId: location,
        customerId: props.customerId,
        productId: q.id,
        quantity: q.quantity,
        dateOrdered: new Date(),
      })
    });

    if (error) {
      message.error('The current stock for ' + error.name + ' is insufficient for the requested order.')
      return;
    }

    if (body.length < 1) {
      handleCancel();
      return;
    }

    setLoading(true);
    axios.post('/orders/products', body)
      .then(({ data }) => {
        const clone : CustomerEntry[] = JSON.parse(JSON.stringify(customers));
        data.forEach((d : ProductOrder) => {
          const customer = clone.find((o) => o._id === d.customerId);
          if (!customer)
            return;
          if (customer.items)
            customer.items += d.quantity;
          else
            customer.items = d.quantity;
          if (customer.balance)
            customer.balance -= d.amountDue;
          else
            customer.balance = 0 - d.amountDue;
        });
        getProductStock(JSON.parse(JSON.stringify(products)));
        dispatch(setCustomerList(clone));
        message.success('The products were successfully sold.')
        handleCancel();
      })
      .catch((err) => {
        console.error(err);
        message.error('Something went wrong while attempting the sale.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    const tempQuantities = JSON.parse(JSON.stringify(quantities));
    tempQuantities.forEach((q : ProductSale) => {
      q.quantity = 0;
    });
    setQuantities(tempQuantities);
  };

  const columns = {
    name: 'Name',
    price: 'Price',
    stock: 'Stock',
    order: 'Order'
  };

  return (
    <div {...rest}>
      <Button
        type='primary'
        size='small'
        style={{ width: '100%' }}
        onClick={() => setIsModalVisible(true)}>
        Sell Products
      </Button>
      <Modal
        title='Sell Products to Customer'
        visible={isModalVisible}
        confirmLoading={loading}
        onOk={sellProducts}
        onCancel={handleCancel}>
        {
          getProducts().length > 0 ?
            <ResponsiveTable
              values={getProducts()}
              columns={columns}
              style={{ margin: -12 }} /> :
            <span>No products were found.</span>
        }
      </Modal>
    </div>
  );
};

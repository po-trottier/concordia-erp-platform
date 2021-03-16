import React, { useEffect, useState } from 'react';
import { Button, Card, Input, message } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { SellProductModal } from './SellProductModal';
import { CustomerEntry } from '../../interfaces/CustomerEntry';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const CustomersList = () => {

  const getColumns = () => ({
    name: 'Company',
    email: 'Email',
    items: 'Items Bought',
    paid: 'Amount Paid',
    balance: 'Balance',
    actions: 'Actions',
  });

  const emptyData: CustomerEntry[] = [];
  const [customerData, setCustomerData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/customers')
      .then(({data}) => {
        axios.get('/orders/products/all')
          .then((resp) => {
            const orders = resp.data;
            data.forEach((c : any) => {
              c.balance = 0;
              c.paid = 0;
              c.items = 0;
              const filtered = orders.filter((o : any) => o.customerId._id === c._id);
              filtered.forEach((o : any) => {
                const totalPrice =  o.productId.price * o.quantity;
                c.balance -= o.isPaid ? 0 : totalPrice;
                c.paid += o.isPaid ? totalPrice : 0;
                c.items += o.quantity;
              })
            })
            setCustomerData(data);
          })
          .catch((err) => {
            console.error(err);
            message.error('Something went wrong while getting the customer orders.');
          });
      })
      .catch((err) => {
        console.error(err);
        message.error('Something went wrong while getting the list of customers.');
      });
  }, [updated]);

  const getCustomers = () => {
    let rows = JSON.parse(JSON.stringify(customerData));

    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r:any) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }

    rows.forEach((r : any) => {
      r.actions = (
        <div style={{ margin: '-4px -8px' }}>
          <SellProductModal
            customerId={r._id}
            style={{ width: 100, margin: '4px 8px', display: 'inline-block' }} />
          <Button
            type='ghost'
            size='small'
            style={{ width: 100, margin: '4px 8px', display: 'inline-block' }}>
            Edit
          </Button>
        </div>
      );
    });

    return rows;
  }

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Card>
      <Search
        placeholder='Search for a customer'
        onChange={onSearch}
        style={{ marginBottom: 18 }} />
      {
        getCustomers().length > 0 ?
          <ResponsiveTable values={getCustomers()} columns={getColumns()} /> :
          <span>No customers were found.</span>
      }
    </Card>
  );
};

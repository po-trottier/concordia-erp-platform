import React, { useEffect, useState } from 'react';
import { Card, Input, message } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { SellProductModal } from './SellProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setCustomerList } from '../../store/slices/CustomerListSlice';
import { CustomerListActions} from "./CustomerListActions";
import axios from '../../plugins/Axios';
import { CustomerEntry } from '../../interfaces/CustomerEntry';
import { EditCustomerForm } from "./EditCustomerForm";

const { Search } = Input;

export const CustomersList = () => {
  const dispatch = useDispatch();

  const customers = useSelector((state : RootState) => state.customerList.list);
  const updated = useSelector((state : RootState) => state.customerList.updated);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/customers')
      .then(({data}) => {
        axios.get('/orders/products/all')
          .then((resp) => {
            const orders = resp.data;
            data.forEach((c : CustomerEntry) => {
              c.balance = 0;
              c.paid = 0;
              c.items = 0;
              const filtered = orders.filter((o : any) => o.customerId._id === c._id);
              filtered.forEach((o : any) => {
                const totalPrice =  o.productId.price * o.quantity;
                if (c.balance !== undefined)
                  c.balance -= o.isPaid ? 0 : totalPrice;
                if (c.paid !== undefined)
                  c.paid += o.isPaid ? totalPrice : 0;
                if (c.items !== undefined)
                  c.items += o.quantity;
              })
            })
            dispatch(setCustomerList(data));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const getCustomers = () => {
    let rows : CustomerEntry[] = JSON.parse(JSON.stringify(customers));

    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }

    rows.forEach((r) => {
      r.actions = (
        <div style={{ margin: '-4px -8px' }}>
          <SellProductModal
            customerId={r._id}
            style={{ width: 100, margin: '4px 8px', display: 'inline-block' }} />
          <EditCustomerForm customer={customers} />
        </div>
      );
    });

    return rows;
  }

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getColumns = () => ({
    name: 'Company',
    email: 'Email',
    items: 'Items Bought',
    paid: 'Amount Paid',
    balance: 'Balance',
    actions: 'Actions',
  });

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

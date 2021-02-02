import React from 'react';
import { Button } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { CustomerEntry } from '../../interfaces/CustomerEntry';

export const CustomersList = () => {

  const getColumns = () => ({
    company: 'Company',
    sold: 'Items Bought',
    paid: 'Paid',
    balance: 'Balance',
    actions: 'Actions',
  });

  const getRows = () : CustomerEntry[] => {
    const customers = [
      {
        company: 'Sports Experts',
        sold: 123,
        paid: 1504,
        balance: -421,
      },
      {
        company: 'Sail',
        sold: 65,
        paid: 789,
        balance: -150,
      },
      {
        company: 'Decathlon',
        sold: 174,
        paid: 2407,
        balance: 0,
      },
      {
        company: 'Amazon CA',
        sold: 1125,
        paid: 11057,
        balance: 0,
      },
      {
        company: 'Ebay CA',
        sold: 155,
        paid: 1674,
        balance: -240,
      },
    ];
    customers.forEach((customer : any) => {
      customer.actions = (<Button type='ghost'>Sell Items</Button>);
    });
    return customers;
  };

  return (
    <ResponsiveTable rows={getRows()} cols={getColumns()} />
  );
};

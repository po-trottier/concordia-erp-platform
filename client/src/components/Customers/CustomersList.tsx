import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { CustomerEntry } from '../../interfaces/CustomerEntry';

const { Search } = Input;

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

  const [tableData, setTableData] = useState(getRows());
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = getRows();
    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r) => r.company.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    setTableData(rows);
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Card>
      <Search
        placeholder='Search for a customer'
        onChange={onSearch}
        style={{ marginBottom: 18 }} />
      <ResponsiveTable rows={tableData} cols={getColumns()} />
    </Card>
  );
};

import React, { useEffect, useState } from 'react';
import { Card, Statistic } from 'antd';

import { FinanceEntry } from '../../interfaces/FinanceEntry';
import { ResponsiveTable } from '../ResponsiveTable';

export const Income = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let val = 0;
    getRows().forEach((row : FinanceEntry) => {
      if (row.balance) {
        val += row.balance;
      }
    });
    setBalance(val);
  }, []);

  const getColumns = () => ({
    companyName: 'Company',
    dateEntered: 'Date Processed',
    dateDue: 'Due Date',
    amount: 'amount',
    paid: 'Paid',
    balance: 'Balance'
  });

  const getRows = () : FinanceEntry[] => {
    const rows = [
      {
        dateEntered: (new Date('2021-01-22')).toLocaleDateString(),
        amount: 30500,
        paid: 10000,
        companyName: 'Mark\'s Bike Store',
        dateDue: (new Date('2021-02-22')).toLocaleDateString(),
      },
      {
        dateEntered: (new Date('2021-01-25')).toLocaleDateString(),
        amount: 4500,
        paid: 3000,
        companyName: 'Sports Experts',
        dateDue: (new Date('2021-02-17')).toLocaleDateString(),
      },
      {
        dateEntered: (new Date('2021-01-28')).toLocaleDateString(),
        amount: 250500,
        paid: 102500,
        companyName: 'Walmart',
        dateDue: (new Date('2021-03-03')).toLocaleDateString(),
      },
      {
        dateEntered: (new Date('2021-01-30')).toLocaleDateString(),
        amount: 25200,
        paid: 12500,
        companyName: 'Giant Montreal',
        dateDue: (new Date('2021-02-21')).toLocaleDateString(),
      },
      {
        dateEntered: (new Date('2021-01-21')).toLocaleDateString(),
        amount: 36200,
        paid: 14000,
        companyName: 'Zellers',
        dateDue: (new Date('2021-03-04')).toLocaleDateString(),
      },
    ];
    rows.forEach((row : FinanceEntry) => {
      return row.balance = row.amount - row.paid;
    });
    return rows;
  };

  return (
    <div>
      <h2>Accounts Receivable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Accounts Receivable Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card>
        <ResponsiveTable cols={getColumns()} rows={getRows()} />
      </Card>
    </div>
  );
};

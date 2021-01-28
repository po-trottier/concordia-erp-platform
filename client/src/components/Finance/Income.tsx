import React, { useEffect, useState } from 'react'
import {Card, Statistic} from 'antd'

import {FinanceEntry} from '../../interfaces/FinanceEntry'
import {ResponsiveTable} from '../ResponsiveTable'

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
    buyer: 'Buyer',
    date: 'Date Processed',
    dateDue: 'Due Date',
    billed: 'Billed',
    paid: 'Paid',
    balance: 'Balance'
  });

  const getRows = () : FinanceEntry[] => {
    const rows = [
      {
        date : (new Date("2021-01-22")).toLocaleDateString(),
        billed: 30500,
        paid: 10000,
        buyer: 'Mark\'s Bike Store',
        dateDue : (new Date("2021-02-22")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-25")).toLocaleDateString(),
        billed: 4500,
        paid: 3000,
        buyer: 'Sports Experts',
        dateDue : (new Date("2021-02-17")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-28")).toLocaleDateString(),
        billed: 250500,
        paid: 102500,
        buyer: 'Walmart',
        dateDue : (new Date("2021-03-03")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-30")).toLocaleDateString(),
        billed: 25200,
        paid: 12500,
        buyer: 'Giant Montreal',
        dateDue : (new Date("2021-02-21")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-21")).toLocaleDateString(),
        billed: 36200,
        paid: 14000,
        buyer: 'Zellers',
        dateDue : (new Date("2021-03-04")).toLocaleDateString(),
      },
    ];
    rows.forEach((row : FinanceEntry) => {
      row.balance  = row.billed - row.paid;
    });
    return rows;
  }

  return (
    <div>
      <h2>Accounts Receivable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title="Accounts Receivable Balance (CAD)" value={balance} precision={2} />
      </Card>
      <Card>
        <ResponsiveTable cols={getColumns()} rows={getRows()} />
      </Card>
    </div>
  );
}

import React, { useEffect, useState } from 'react'
import {Card, Statistic} from 'antd';

import {FinanceEntry} from '../../interfaces/FinanceEntry'
import { ResponsiveTable } from '../ResponsiveTable'

export const Expenses = () => {
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
    buyer: 'Vendor',
    date: 'Date Processed',
    dateDue: 'Due Date',
    billed: 'Billed',
    paid: 'Paid',
    balance: 'Balance',
  });

  const getRows = () : FinanceEntry[] => {
    const data = [
      {
        date : (new Date("2021-01-20")).toLocaleDateString(),
        billed: 72000,
        paid: 66000,
        buyer: 'Digikey',
        dateDue : (new Date("2021-02-27")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-24")).toLocaleDateString(),
        billed: 30000,
        paid: 0,
        buyer: 'The Bike Shop',
        dateDue : (new Date("2021-02-22")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-20")).toLocaleDateString(),
        billed: 92000,
        paid: 89000,
        buyer: 'Canada Bicycle Parts',
        dateDue : (new Date("2021-02-27")).toLocaleDateString(),
      },
      {
        date : (new Date("2021-01-29")).toLocaleDateString(),
        billed: 105000,
        paid: 42000,
        buyer: 'Chain Reaction Cycles',
        dateDue : (new Date("2021-03-03")).toLocaleDateString(),
      },
    ];

    data.forEach((d : FinanceEntry) => {
      d.balance  = d.paid - d.billed;
    });

    return data;
  }

  return (
    <div>
      <h2>Accounts Payable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title="Accounts Payable Balance (CAD)" value={balance} precision={2} />
      </Card>
      <Card>
        <ResponsiveTable cols={getColumns()} rows={getRows()} />
      </Card>
    </div>
  );
}

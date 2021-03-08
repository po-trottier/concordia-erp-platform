import React, { useEffect, useState } from 'react';
import {Card, message, Statistic} from 'antd';

import { FinanceEntry } from '../../interfaces/FinanceEntry';
import { ResponsiveTable } from '../ResponsiveTable';
import axios from "../../plugins/Axios";

export const Income = () => {
  const [balance, setBalance] = useState(0);
  const emptyData : FinanceEntry[] = [];
  const [financeEntryData, setFinanceEntryData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    setUpdated(true);
    axios.get('/finance/receivables/active')
      .then((res) => {
        if (res && res.data) {
          const data : FinanceEntry[] = [];
          let balance : number = 0;
          res.data.forEach((f : any) => {
            let accountsReceivableBalance = (f.amount - f.paid);
            data.push({
              dateEntered: f.dateEntered.split("T")[0],
              dateDue: f.dateDue.split("T")[0],
              companyName : f.companyName,
              balance : accountsReceivableBalance,
              amount : f.amount,
              paid : f.paid
            });
            balance += accountsReceivableBalance;
          });
          setBalance(balance);
          setFinanceEntryData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts receivable.');
        console.error(err);
      });
  }, [updated]);

  const getColumns = () => ({
    companyName: 'Buyer',
    dateEntered: 'Date Processed',
    dateDue: 'Due Date',
    amount: 'Amount',
    paid: 'Paid',
    balance: 'Balance',
  });


  return (
    <div>
      <h2>Accounts Receivable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Accounts Receivable Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card>
        <ResponsiveTable cols={getColumns()} rows={financeEntryData} />
      </Card>
    </div>
  );
};

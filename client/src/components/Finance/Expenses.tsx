import React, {useEffect, useState} from 'react';
import {Card, message, Statistic} from 'antd';

import {FinanceEntry} from '../../interfaces/FinanceEntry';
import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";

export const Expenses = () => {
  const [balance, setBalance] = useState(0);
  const emptyData : FinanceEntry[] = [];
  const [financeEntryData, setFinanceEntryData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    setUpdated(true);
    axios.get('/finance/payables/active')
      .then((res) => {
        if (res && res.data) {
          const data : FinanceEntry[] = [];
          let balance : number = 0;
          res.data.forEach((f : any) => {
            let accountPayableBalance = -(f.amount - f.paid);
            data.push({
              dateEntered: f.dateEntered,
              dateDue: f.dateDue,
              companyName : f.companyName,
              balance : accountPayableBalance,
              amount : -f.amount,
              paid : -f.paid
            });
            balance += accountPayableBalance;
          });
          setBalance(balance);
          setFinanceEntryData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts payables.');
        console.error(err);
      });
  }, [updated]);

  const getColumns = () => ({
    companyName: 'Vendor',
    dateEntered: 'Date Processed',
    dateDue: 'Due Date',
    amount: 'Amount',
    paid: 'Paid',
    balance: 'Balance',
  });


  return (
    <div>
      <h2>Accounts Payable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Accounts Payable Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card>
        <ResponsiveTable cols={getColumns()} rows={financeEntryData} />
      </Card>
    </div>
  );
};

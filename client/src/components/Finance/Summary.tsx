import React, { useEffect, useState } from 'react';
import {Card, message, Statistic, Typography} from 'antd';
import { Line } from '@ant-design/charts';

import { ResponsiveTable } from '../ResponsiveTable';
import { SummaryEntry } from '../../interfaces/SummaryEntry';
import {FinanceEntry} from "../../interfaces/FinanceEntry";
import axios from "../../plugins/Axios";

const { Title } = Typography;

export const Summary = () => {
  const [balance, setBalance] = useState(0);
  const [expectedBalance, setExpectedBalance] = useState(0);
  const emptyData : SummaryEntry[] = [];
  const [summaryEntryData, setSummaryEntryData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    setUpdated(true);
    axios.get('/finance ')
      .then((res) => {
        if (res && res.data) {
          const data : SummaryEntry[] = [];
          let balance : number = 0;
          let expectedBalance : number = 0;
          res.data.forEach((f : any) => {
            // data.push({
            //   dateEntered: f.dateEntered,
            //   dateDue: f.dateDue,
            //   companyName : f.companyName,
            //   balance : accountsReceivableBalance,
            //   amount : f.amount,
            //   paid : f.paid
            // });
            balance += f.paid;
            expectedBalance += f.amount;
          });
          setBalance(balance);
          setExpectedBalance(expectedBalance)
          setSummaryEntryData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts receivable.');
        console.error(err);
      });
  }, [updated]);

  const getColumns = () => ({
    date: 'Summary Date',
    income: 'Income',
    expenses: 'Expenses',
    profit: 'Profit'
  });

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Account Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Expected balance (CAD)' value={expectedBalance} precision={2} />
      </Card>
      <Card style={{ margin: '24px 0' }}>
        <Line data={summaryEntryData} xField='date' yField='profit' />
      </Card>
      <Card>
        <Title level={4} style={{ marginBottom: '24px' }}>
          Daily Financial Summary
        </Title>
        <ResponsiveTable rows={summaryEntryData} cols={getColumns()} />
      </Card>
    </div>
  );
};

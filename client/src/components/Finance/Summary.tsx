import React, {useEffect, useState} from 'react';
import {Card, message, Statistic, Typography} from 'antd';
import {Line} from '@ant-design/charts';

import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";
import {SummaryEntry} from "../../interfaces/SummaryEntry";

const { Title } = Typography;

export const Summary = () => {
  const [balance, setBalance] = useState(0);
  const [expectedBalance, setExpectedBalance] = useState(0);
  const emptyData : SummaryEntry[] = [];
  const [summaryEntryData, setSummaryEntryData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    setUpdated(true);
    axios.get('/orders/summary ')
      .then((res) => {
        if (res && res.data) {
          const data : SummaryEntry[] = [];
          let balance : number = 0;
          let expectedBalance : number = 0;
          res.data.forEach((s : any) => {
            data.push({
              date: s.date,
              profit: s.profit,
            });
            balance += 0;
            expectedBalance += s.profit;
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

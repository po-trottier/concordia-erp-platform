import React, {useEffect, useState} from 'react';
import {Card, message, Statistic, Typography, Row, Col} from 'antd';
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
          let expectedBalance : number = 0;
          res.data.forEach((s : any) => {
            data.push({
              date: s.date,
              profit: s.balance,
            });
            expectedBalance += s.balance;
          });
          setExpectedBalance(expectedBalance)
          setSummaryEntryData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts receivable.');
        console.error(err);
      });

    axios.get('/orders/balance ')
      .then((res) => {
        if (res && res.data) {
          setBalance(res.data.balance);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts receivable.');
        console.error(err);
      });
  }, [updated]);

  const getColumns = () => ({
    date: 'Summary Date',
    profit: 'Daily Profit'
  });



  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Row>
          <Col span={12}>
            <Statistic title='Account Balance (CAD)' value={balance} precision={2} />
          </Col>
          <Col span={12}>
            <Statistic title='Expected Balance (CAD)' value={expectedBalance} precision={2} />
          </Col>
        </Row>
      </Card>

      {summaryEntryData.length > 0 ?
        <div>
          <Card style={{ margin: '24px 0' }}>
            <Line data={summaryEntryData} xField='date' yField='profit' isStack={true} />
          </Card>
          <Card>
            <Title level={4} style={{ marginBottom: '24px' }}>
              Daily Financial Summary
            </Title>
            <ResponsiveTable rows={summaryEntryData} cols={getColumns()} />
          </Card>
        </div>
        :
        <div>No orders were found.</div>}

    </div>
  );
};

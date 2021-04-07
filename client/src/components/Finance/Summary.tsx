import React, {useEffect, useState} from 'react';
import {Card, message, Statistic, Typography, Row, Col} from 'antd';
import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";
import {SummaryEntry} from "../../interfaces/SummaryEntry";
import Chart from "react-apexcharts";

const { Title } = Typography;

export const Summary = () => {
  const emptyData : SummaryEntry[] = [];
  const [balance, setBalance] = useState(0);
  const [expectedBalance, setExpectedBalance] = useState(0);
  const [summaryEntryData, setSummaryEntryData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/orders/summary ')
      .then((res) => {
        if (res && res.data) {
          const data : SummaryEntry[] = [];
          let expectedBalance = 0;
          res.data.forEach((s : any) => {
            data.push({
              date: s.date,
              balance: s.balance,
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
    balance: 'Daily Profit'
  });

  const getChartData = () => {
    const dataArray: any[] = summaryEntryData.map((row: any) => ({
      x: row.date,
      y: row.balance
    }));

    return {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          type: 'datetime',
        },
      },
      series: [{
        name: 'balance',
        data: dataArray
      }]
    };
  }

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Row>
          <Col sm={12} span={24}>
            <Statistic title='Account Balance (CAD)' value={balance} precision={2} />
          </Col>
          <Col sm={12} span={24}>
            <Statistic title='Expected Balance (CAD)' value={expectedBalance} precision={2} />
          </Col>
        </Row>
      </Card>

      {summaryEntryData.length > 0 ?
        <div>
          <Card style={{ margin: '24px 0' }}>
              <Chart {...getChartData()} type="line" height={350} />
          </Card>
          <Card>
            <Title level={4} style={{ marginBottom: '24px' }}>
              Daily Financial Summary
            </Title>
            <ResponsiveTable values={summaryEntryData} columns={getColumns()} />
          </Card>
        </div>
        :
        <div>No orders were found.</div>}
    </div>
  );
};

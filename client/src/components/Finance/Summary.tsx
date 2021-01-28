import React, { useEffect, useState } from 'react';
import {Card, Statistic} from 'antd'
import {Line} from '@ant-design/charts';

import {ResponsiveTable} from '../ResponsiveTable';
import {SummaryEntry} from '../../interfaces/SummaryEntry';

export const Summary = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let val = 0;
    getRows().forEach((row : SummaryEntry) => {
      if (row.profit) {
        val += row.profit;
      }
    });
    setBalance(val);
  }, []);

  const getColumns = () => ({
    date: 'Processing Date',
    income: 'Income',
    expenses: 'Expenses',
    profit: 'Profit'
  });

  const getRows = () => {
    const rows: SummaryEntry[] = [
      {
        date : (new Date("2021-01-30")).toLocaleDateString(),
        income: 70000,
        expenses: 66000,
      },
      {
        date : (new Date("2021-01-29")).toLocaleDateString(),
        income : 72500,
        expenses : 73000,
      },
      {
        date : (new Date("2021-01-28")).toLocaleDateString(),
        income : 79500,
        expenses : 81000,
      },
      {
        date : (new Date("2021-01-27")).toLocaleDateString(),
        income : 82500,
        expenses : 71000,
      },
      {
        date : (new Date("2021-01-26")).toLocaleDateString(),
        income : 85200,
        expenses : 79400,
      },
      {
        date : (new Date("2021-01-25")).toLocaleDateString(),
        income : 82100,
        expenses : 71150,
      },
      {
        date : (new Date("2021-01-24")).toLocaleDateString(),
        income : 77500,
        expenses : 71000,
      },
      {
        date : (new Date("2021-01-23")).toLocaleDateString(),
        income : 81500,
        expenses : 75400,
      },
      {
        date : (new Date("2021-01-22")).toLocaleDateString(),
        income : 84500,
        expenses : 73200,
      },
      {
        date : (new Date("2021-01-21")).toLocaleDateString(),
        income : 80500,
        expenses : 73200,
      },
      {
        date : (new Date("2021-01-20")).toLocaleDateString(),
        income : 82700,
        expenses : 71400,
      },
      {
        date : (new Date("2021-01-19")).toLocaleDateString(),
        income : 78800,
        expenses : 68400,
      },
      {
        date : (new Date("2021-01-18")).toLocaleDateString(),
        income : 70500,
        expenses : 67000,
      },
    ];
    rows.forEach((row : SummaryEntry) => {
      row.profit  = row.income - row.expenses;
    });
    return rows;
  }

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title="Account Balance (CAD)" value={balance} precision={2} />
      </Card>
      <Card style={{ margin: '24px 0' }}>
        <Line data={getRows()} xField="date" yField="profit" />
      </Card>
      <Card>
        <ResponsiveTable rows={getRows()} cols={getColumns()} />
      </Card>
    </div>
  );
}

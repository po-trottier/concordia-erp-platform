import React from 'react';
import {Card, Table, Statistic} from 'antd'
import {Line} from '@ant-design/charts';
import {tableColumn} from '../../interfaces/TableColumn'
import {dailySummary} from '../../interfaces/DailySummary'

export const Summary = () => {
  const getColumns = () : tableColumn[] => ([
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Income',
      dataIndex: 'income',
      sorter: {
        compare: (a : any, b : any) => a.income - b.income,
        multiple: 3,
      },
    },
    {
      title: 'Expenses',
      dataIndex: 'expenses',
      sorter: {
        compare: (a : any, b : any) => a.expenses - b.expenses,
        multiple: 2,
      },
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      sorter: {
        compare: (a : any, b : any) => (a.income - a.expenses) - (b.income - b.expenses),
        multiple: 1,
      },
    },
  ]);

  const getData = () : summaryEntry[] => {
    const data = [
      {
        key: '1',
        date : (new Date("2021-01-30")).toLocaleDateString(),
        income: 70000,
        expenses: 66000,
      },
      {
        key: '2',
        date : (new Date("2021-01-29")).toLocaleDateString(),
        income : 72500,
        expenses : 73000,
      },
      {
        key: '3',
        date : (new Date("2021-01-28")).toLocaleDateString(),
        income : 79500,
        expenses : 81000,
      },
      {
        key: '4',
        date : (new Date("2021-01-27")).toLocaleDateString(),
        income : 82500,
        expenses : 71000,
      },
      {
        key: '5',
        date : (new Date("2021-01-26")).toLocaleDateString(),
        income : 85200,
        expenses : 79400,
      },
      {
        key: '6',
        date : (new Date("2021-01-25")).toLocaleDateString(),
        income : 82100,
        expenses : 71150,
      },
      {
        key: '7',
        date : (new Date("2021-01-24")).toLocaleDateString(),
        income : 77500,
        expenses : 71000,
      },
      {
        key: '8',
        date : (new Date("2021-01-23")).toLocaleDateString(),
        income : 81500,
        expenses : 75400,
      },
      {
        key: '9',
        date : (new Date("2021-01-22")).toLocaleDateString(),
        income : 84500,
        expenses : 73200,
      },
      {
        key: '10',
        date : (new Date("2021-01-21")).toLocaleDateString(),
        income : 80500,
        expenses : 73200,
      },
      {
        key: '11',
        date : (new Date("2021-01-20")).toLocaleDateString(),
        income : 82700,
        expenses : 71400,
      },
      {
        key: '12',
        date : (new Date("2021-01-19")).toLocaleDateString(),
        income : 78800,
        expenses : 68400,
      },
      {
        key: '13',
        date : (new Date("2021-01-18")).toLocaleDateString(),
        income : 70500,
        expenses : 67000,
      },
    ];

    data.forEach((d : dailySummary) => {
      d.profit  = d.income - d.expenses;
    });

    return data;
  }

  const config = {
    data: getData(),
    xField: 'date',
    yField: 'profit'
  };

  const accountBalance : number = 242430;

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title="Account Balance (CAD)" value={accountBalance} precision={2} />
      </Card>
      <Card style={{ margin: '24px 0' }}>
        <Line {...config} />
      </Card>
      <Card>
        <Table
          columns={getColumns()}
          dataSource={getData()}
          style={{ marginBottom: '-24px' }} />
      </Card>
    </div>
  );
}

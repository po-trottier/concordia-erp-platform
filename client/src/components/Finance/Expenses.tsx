import React from 'react';
import {Button} from 'antd';

export const Expenses = () => {
interface dataColumn {
  title: string,
  dataIndex: string,
  sorter?: {
    compare: any,
    multiple: number
  }
}

interface dataPoint  {
  key: string,
  date: string,
  dateDue: string,
  billed: number,
  paid: number,
  vendor: string,
  balance?: number
}

export const Summary = () => {
  const getColumns = () : dataColumn[] => ([
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Billed',
      dataIndex: 'billed',
      sorter: {
        compare: (a : any, b : any) => a.billed - b.billed,
        multiple: 3,
      },
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      sorter: {
        compare: (a : any, b : any) => a.paid - b.paid,
        multiple: 2,
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      sorter: {
        compare: (a : any, b : any) => (a.billed - a.paid) - (b.billed - b.paid),
        multiple: 1,
      },
    },
  ]);

  const getData = () : dataPoint[] => {
    const data = [
      {
        key: '1',
        date : (new Date("2020-01-30")).toLocaleDateString(),
        income: 70000,
        expenses: 66000,
      },
      {
        key: '2',
        date : (new Date("2020-01-29")).toLocaleDateString(),
        income : 72500,
        expenses : 73000,
      },
      {
        key: '3',
        date : (new Date("2020-01-28")).toLocaleDateString(),
        income : 79500,
        expenses : 81000,
      },
      {
        key: '4',
        date : (new Date("2020-01-27")).toLocaleDateString(),
        income : 82500,
        expenses : 71000,
      },
    ];

    data.forEach((d : dataPoint) => {
      d.profit  = d.income - d.expenses;
    });

    return data;
  }

  const config = {
    data: getData(),
    xField: 'date',
    yField: 'profit'
  };

  return (
    <div>
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

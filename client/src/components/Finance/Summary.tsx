import React from 'react';
import {Card, Table} from 'antd'
import {Line} from '@ant-design/charts';

// TODO: Put interfaces in their own file, maybe in a new "interfaces" directory
// in the src folder so they can be reused elsewhere if needed.

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
  income: number,
  expenses: number,
  profit?: number
}

export const Summary = () => {
  const getColumns = () : dataColumn[] => ([
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
        income : 85000,
        expenses : 73000,
      },
      {
        key: '3',
        date : (new Date("2020-01-28")).toLocaleDateString(),
        income : 78000,
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

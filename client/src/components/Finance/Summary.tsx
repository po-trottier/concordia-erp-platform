import React from 'react';
import {Table} from 'antd';

export const Summary = () => {
const columns = [
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
];

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
    income : 81000,
    expenses : 78000,
  },
  {
    key: '4',
    date : (new Date("2020-01-27")).toLocaleDateString(),
    income : 82500,
    expenses : 71000,
  },
];

data.forEach(d => {
 (d as any).profit  = d.income - d.expenses;
})

  return (
    <Table columns={columns} dataSource={data} />
  );
}

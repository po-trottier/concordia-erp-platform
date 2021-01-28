import React from 'react';
import {Card, Table, Statistic} from 'antd'
import {tableColumn} from '../../interfaces/TableColumn'
import {financeEntry} from '../../interfaces/FinanceEntry'

export const Income = () => {

  const getColumns = () : tableColumn[] => ([
    {
      title: 'Buyer',
      dataIndex: 'companyName',
      responsive: ["sm"]
    },
    {
      title: 'Date',
      dataIndex: 'date',
      responsive: ["sm"]
    },
    {
      title: 'Due Date',
      dataIndex: 'dateDue',
      responsive: ["sm"]
    },
    {
      title: 'Billed',
      dataIndex: 'billed',
      sorter: {
        compare: (a : any, b : any) => a.billed - b.billed,
        multiple: 3,
      },
      responsive: ["sm"]
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      sorter: {
        compare: (a : any, b : any) => a.paid - b.paid,
        multiple: 2,
      },
      responsive: ["sm"]
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      sorter: {
        compare: (a : any, b : any) => (a.billed - a.paid) - (b.billed - b.paid),
        multiple: 1,
      },
      responsive: ["sm"]
    },
  ]);

  const getData = () : financeEntry[] => {
    const data = [
      {
        key: '1',
        date : (new Date("2021-01-22")).toLocaleDateString(),
        billed: 30500,
        paid: 10000,
        companyName: 'Mark\'s Bike Store',
        dateDue : (new Date("2021-02-22")).toLocaleDateString(),
      },
      {
        key: '2',
        date : (new Date("2021-01-25")).toLocaleDateString(),
        billed: 4500,
        paid: 3000,
        companyName: 'Sports Experts',
        dateDue : (new Date("2021-02-17")).toLocaleDateString(),
      },
      {
        key: '3',
        date : (new Date("2021-01-28")).toLocaleDateString(),
        billed: 250500,
        paid: 102500,
        companyName: 'Walmart',
        dateDue : (new Date("2021-03-03")).toLocaleDateString(),
      },
      {
        key: '4',
        date : (new Date("2021-01-30")).toLocaleDateString(),
        billed: 25200,
        paid: 12500,
        companyName: 'Giant Montreal',
        dateDue : (new Date("2021-02-21")).toLocaleDateString(),
      },
      {
        key: '4',
        date : (new Date("2021-01-21")).toLocaleDateString(),
        billed: 36200,
        paid: 14000,
        companyName: 'Zellers',
        dateDue : (new Date("2021-03-04")).toLocaleDateString(),
      },
    ];

    data.forEach((d : financeEntry) => {
      d.balance  = d.billed - d.paid;
    });

    return data;
  }

  const accountReceivableBalance = 204900;
  return (
    <div>
      <h2>Accounts Receivable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title="Accounts Receivable Balance (CAD)" value={accountReceivableBalance} precision={2} />
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

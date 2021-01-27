import React from 'react';
import {Card, Table, Statistic} from 'antd'
import {tableColumn} from '../../interfaces/TableColumn'
import {financeEntry} from '../../interfaces/FinanceEntry'

export const Income = () => {

  const getColumns = () : tableColumn[] => ([
    {
      title: 'Buyer',
      dataIndex: 'company_name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Due Date',
      dataIndex: 'dateDue',
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

  const getData = () : financeEntry[] => {
    const data = [
      {
        key: '1',
        date : (new Date("2021-01-22")).toLocaleDateString(),
        billed: 30500,
        paid: 10000,
        company_name: 'Mark\'s Bike Store',
        dateDue : (new Date("2021-02-22")).toLocaleDateString(),
      },
      {
        key: '2',
        date : (new Date("2021-01-25")).toLocaleDateString(),
        billed: 4500,
        paid: 3000,
        company_name: 'Sports Experts',
        dateDue : (new Date("2021-02-17")).toLocaleDateString(),
      },
      {
        key: '3',
        date : (new Date("2021-01-28")).toLocaleDateString(),
        billed: 250500,
        paid: 102500,
        company_name: 'Walmart',
        dateDue : (new Date("2021-03-03")).toLocaleDateString(),
      },
      {
        key: '4',
        date : (new Date("2021-01-30")).toLocaleDateString(),
        billed: 25200,
        paid: 12500,
        company_name: 'Giant Montreal',
        dateDue : (new Date("2021-02-21")).toLocaleDateString(),
      },
      {
        key: '4',
        date : (new Date("2021-01-21")).toLocaleDateString(),
        billed: 36200,
        paid: 14000,
        company_name: 'Zellers',
        dateDue : (new Date("2021-03-04")).toLocaleDateString(),
      },
    ];

    data.forEach((d : accounts) => {
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

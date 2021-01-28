import React from 'react';
import {Card, Table, Statistic} from 'antd';
import {tableColumn} from '../../interfaces/TableColumn'
import {financeEntry} from '../../interfaces/FinanceEntry'
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

export const Expenses = () => {

  const getColumns = () : tableColumn[] => ([
    {
      title: 'Vendor',
      dataIndex: 'companyName',
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Date',
      dataIndex: 'date',
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Due Date',
      dataIndex: 'dateDue',
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Billed',
      dataIndex: 'billed',
      sorter: {
        compare: (a : any, b : any) => a.billed - b.billed,
        multiple: 3,
      },
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      sorter: {
        compare: (a : any, b : any) => a.paid - b.paid,
        multiple: 2,
      },
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      sorter: {
        compare: (a : any, b : any) => (a.billed - a.paid) - (b.billed - b.paid),
        multiple: 1,
      },
      responsive: ["sm"] as Breakpoint[]
    },
  ]);

  const getData = () : financeEntry[] => {
    const data = [
      {
        key: '1',
        date : (new Date("2021-01-20")).toLocaleDateString(),
        billed: 72000,
        paid: 66000,
        companyName: 'Digikey',
        dateDue : (new Date("2021-02-27")).toLocaleDateString(),
      },
      {
        key: '2',
        date : (new Date("2021-01-24")).toLocaleDateString(),
        billed: 30000,
        paid: 0,
        companyName: 'The Bike Shop',
        dateDue : (new Date("2021-02-22")).toLocaleDateString(),
      },
      {
        key: '3',
        date : (new Date("2021-01-20")).toLocaleDateString(),
        billed: 92000,
        paid: 89000,
        companyName: 'Canada Bicycle Parts',
        dateDue : (new Date("2021-02-27")).toLocaleDateString(),
      },
      {
        key: '4',
        date : (new Date("2021-01-29")).toLocaleDateString(),
        billed: 105000,
        paid: 42000,
        companyName: 'Chain Reaction Cycles',
        dateDue : (new Date("2021-03-03")).toLocaleDateString(),
      },
    ];

    data.forEach((d : financeEntry) => {
      d.balance  = d.billed - d.paid;
    });

    return data;
  }

  const accountPayableBalance = 102000;
  return (
    <div>
      <h2>Accounts Payable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title="Accounts Payable Balance (CAD)" value={accountPayableBalance} precision={2} />
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

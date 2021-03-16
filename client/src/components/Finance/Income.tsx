import React, {useEffect, useState} from 'react';
import { Card, Checkbox, message, Statistic, Switch } from 'antd';
import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";
import {ProductOrder} from "../../interfaces/ProductOrder";

export const Income = () => {
  const emptyData : ProductOrder[] = [];
  const [balance, setBalance] = useState(0);
  const [productOrderData, setProductOrderData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  const [showPaid, setShowPaid] = useState(false);

  useEffect(() => {
    axios.get('/orders/products/all')
      .then((res) => {
        setProductOrderData(res.data)
        let balance = 0;
        res.data.forEach((d: any) => {
          if(!d.isPaid)
            balance += d.amountDue;
        })
        setBalance(balance);
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts payables.');
        console.error(err);
      });
    setUpdated(true);
  }, [updated]);

  const getColumns = () => ({
    customerName: 'Customer',
    dateOrdered: 'Date Ordered',
    dateDue: 'Due Date',
    amountDue: 'Amount',
    isPaid: "Paid",
  });

  const getOrders = () => {
    const data = JSON.parse(JSON.stringify(productOrderData));
    const orders: any[] = [];
    data.forEach((m : any) => {
      if(!m.isPaid || showPaid) {
        m.dateOrdered = m.dateOrdered.split("T")[0];
        m.dateDue = m.dateDue.split("T")[0];
        m.customerName = m.customerId;
        m.isPaid = <Checkbox checked={m.isPaid} />;
        orders.push(m);
      }
    });
    return orders;
}

  return (
    <div>
      <h2>Accounts Receivable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Accounts Receivable Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card>
        <div style={{ margin: '24px 0', textAlign:'right'}}>
          <span>Show Paid Orders</span>
          <Switch onChange={(val:boolean) => {
            setShowPaid(val)
          }} style={{ marginLeft: 10 }} />
        </div>
        {getOrders().length > 0 ?
          <ResponsiveTable cols={getColumns()} rows={getOrders()} />
        : <div>No orders were found.</div>}
      </Card>
    </div>
  );
};

import React, {useEffect, useState} from 'react';
import {Card, message, Statistic, Switch} from 'antd';

import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";
import {MaterialOrder} from "../../interfaces/MaterialOrder";

export const Expenses = () => {
  const emptyData : MaterialOrder[] = [];
  const emptyResponse : any = undefined;
  const [response, setResponse] = useState(emptyResponse);
  const [balance, setBalance] = useState(0);
  const [materialOrderData, setMaterialOrderData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  const [showPaid, setShowPaid] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/orders/materials/all')
      .then((res) => {
        setResponse(res);
        setUpdated(true);
        getOrders();
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts payables.');
        console.error(err);
      });
  }, [updated]);

  const getColumns = () => ({
    vendorName: 'Supplier',
    dateOrdered: 'Date Ordered',
    dateDue: 'Due Date',
    amountDue: 'Amount',
    isPaid: "Paid",
  });

  const getOrders = () => {
    if (response && response.data) {
      const data : MaterialOrder[] = [];
      let balance = 0;
      response.data.forEach((m : any) => {
        if(!m.isPaid)
          balance += m.amountDue;

        if(!m.isPaid || showPaid) {
          data.push({
            dateOrdered: m.dateOrdered.split("T")[0],
            dateDue: m.dateDue.split("T")[0],
            vendorName: m.materialId.vendorName,
            amountDue: m.amountDue,
            isPaid: m.isPaid ? "true" : "false",
          });
        }
      });
      setBalance(balance);
      setMaterialOrderData(data);
    }
  }

  return (
    <div>
      <h2>Accounts Payable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Accounts Payable Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card>
        <div style={{ margin: '24px 0', textAlign:'right'}}>
          <span>Show Paid Orders</span>
          <Switch
          style={{ marginLeft: 10 }}
          onChange={() => {
            setShowPaid(!showPaid);
            getOrders();
          }} />
        </div>
        {materialOrderData.length > 0 ?
          <ResponsiveTable cols={getColumns()} rows={materialOrderData} />
        : <div>No orders were found.</div>}
      </Card>
    </div>
  );
};

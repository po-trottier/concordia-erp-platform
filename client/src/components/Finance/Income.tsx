import React, {useEffect, useState} from 'react';
import {Button, Card, message, Statistic} from 'antd';
import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";
import {ProductOrder} from "../../interfaces/ProductOrder";

export const Income = () => {
  const [balance, setBalance] = useState(0);
  const emptyData : ProductOrder[] = [];
  const [productOrderData, setProductOrderData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    setUpdated(true);
    axios.get('/orders/products/all')
      .then((res) => {
        if (res && res.data) {
          const data : ProductOrder[] = [];
          let balance = 0;
          res.data.forEach((f : any) => {
            if(!f.isPaid)
              balance += f.amountDue;

            data.push({
              dateOrdered: f.dateOrdered.split("T")[0],
              dateDue: f.dateDue.split("T")[0],
              amountDue: f.amountDue,
              isPaid: f.isPaid ? "true" : "false",
              details: (
                <Button type='primary' size='small'>
                  See Details
                </Button>
              ),
            });
          });
          setBalance(balance);
          setProductOrderData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts receivable.');
        console.error(err);
      });
  }, [updated]);

  const getColumns = () => ({
    dateOrdered: 'Date Ordered',
    dateDue: 'Due Date',
    amountDue: 'Amount',
    isPaid: "Paid?",
    details: "Details",
  });


  return (
    <div>
      <h2>Accounts Receivable</h2>
      <Card style={{ margin: '24px 0' }}>
        <Statistic title='Accounts Receivable Balance (CAD)' value={balance} precision={2} />
      </Card>
      <Card>
        <ResponsiveTable cols={getColumns()} rows={productOrderData} />
      </Card>
    </div>
  );
};

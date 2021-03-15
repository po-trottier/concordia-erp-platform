import React, {useEffect, useState} from 'react';
import {Button, Card, message, Statistic, Switch} from 'antd';
import {ResponsiveTable} from '../ResponsiveTable';
import axios from "../../plugins/Axios";
import {ProductOrder} from "../../interfaces/ProductOrder";

export const Income = () => {
  const emptyData : ProductOrder[] = [];
  const [balance, setBalance] = useState(0);
  const [productOrderData, setProductOrderData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    getOrders(false);
  }, [updated]);

  const getColumns = () => ({
    dateOrdered: 'Date Ordered',
    dateDue: 'Due Date',
    amountDue: 'Amount',
    isPaid: "Paid",
    details: "Details",
  });

  const getOrders = (showPaidOnes: boolean) => {
    axios.get('/orders/products/all')
      .then((res) => {
        if (res && res.data) {
          const data : ProductOrder[] = [];
          let balance = 0;
          res.data.forEach((p : any) => {
            if(!p.isPaid) {
              balance += p.amountDue;
            }

            if(!p.isPaid || showPaidOnes) {
              data.push({
                dateOrdered: p.dateOrdered.split("T")[0],
                dateDue: p.dateDue.split("T")[0],
                amountDue: p.amountDue,
                isPaid: p.isPaid ? "true" : "false",
                details: (
                  <Button type='primary' size='small'>
                    See Details
                  </Button>
                ),
              });
            }
          });
          setBalance(balance);
          setProductOrderData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of accounts receivable.');
        console.error(err);
      });
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
          <Switch onChange={getOrders} style={{ marginLeft: 10 }}/>
        </div>
        {productOrderData.length > 0 ? 
          <ResponsiveTable cols={getColumns()} rows={productOrderData} />
        : <div>No orders were found.</div>}  
      </Card>
    </div>
  );
};

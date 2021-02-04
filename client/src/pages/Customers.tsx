import React from 'react';
import { Button } from 'antd';

import { CustomersList } from '../components/Customers/CustomersList';

export const Customers = () => {
  return (
    <div>
      <CustomersList />
      <Button type='primary' style={{ marginTop: 16 }}>
        Add a new Customer
      </Button>
    </div>
  );
};

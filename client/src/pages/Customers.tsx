import React from 'react';
import { Button } from 'antd';

import { CustomersList } from '../components/Customers/CustomersList';
import { CreateNewCustomerModal} from "../components/Customers/CreateNewCustomerModal";

export const Customers = () => {
  return (
    <div>
      <CustomersList />
      <CreateNewCustomerModal/>
    </div>
  );
};

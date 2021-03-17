import React from 'react';

import { CustomersList } from '../components/Customers/CustomersList';
import { CreateCustomerModal} from "../components/Customers/CreateCustomerModal";

export const Customers = () => {
  return (
    <div>
      <CustomersList />
      <CreateCustomerModal />
    </div>
  );
};

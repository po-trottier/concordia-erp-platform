import React from 'react';
import { Button, InputNumber, Modal } from 'antd';

import { BicycleEntry } from '../../interfaces/BicycleEntry';
import ProductDetails from './ProductDetails';

const showModal = (row : any) => {
  Modal.info({
    onOk() {
    },
    title: 'Product Details',
    width: 500,
    content: (
      <ProductDetails
        name={row.name}
        price={row.price}
        quantity={row.quantity}
        frameSize={row.frameSize}
        parts={row.parts.join(', ')}
        color={row.color}
        finish={row.finish}
        grade={row.grade}
        description={row.description} />
    )
  });
};

const data = {
  getInventoryColumns: () => ({
    name: 'name',
    price: 'price',
    quantity: 'quantity',
    description: 'description',
    details: 'details'
  }),

  getCatalogColumns: () => ({
    name: 'Name',
    price: 'Price',
    quantity: 'Quantity',
    description: 'Description',
    build: 'Build'
  }),

  getRows: () => {
    const rows : BicycleEntry[] = [
      {
        key: '1',
        name: 'Mongoose Legion L100 BMX',
        description: '10 Downing Street',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 99.99,
        frameSize: '18in',
        color: 'Blue',
        finish: 'Matte',
        grade: 'Steel',
      },
      {
        key: '2',
        name: 'Women\'s Newport 3SPD',
        description: '10 Downing Street',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 119.99,
        frameSize: '18in',
        color: 'Grey',
        finish: 'Matte',
        grade: 'Steel',
      },
      {
        key: '3',
        name: 'Gallium Pro Disc',
        description: 'Destined for glory',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 299.99,
        frameSize: '18in',
        color: 'Red',
        finish: 'Chrome',
        grade: 'Aluminum',
      },
      {
        key: '4',
        name: 'Krypton Pro',
        description: 'A road-hungry endurance bike with the will to win',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 199.99,
        frameSize: '18in',
        color: 'Silver',
        finish: 'Matte',
        grade: 'Carbon',
      },
      {
        key: '5',
        name: 'Xenon 650',
        description: 'Our popular junior racing bike',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 399.99,
        frameSize: '18in',
        color: 'Black',
        finish: 'Matte',
        grade: 'Carbon',
      },
      {
        key: '6',
        name: 'Subito E-Gravel',
        description: 'Already looking for the next great escape',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 199.99,
        frameSize: '18in',
        color: 'White',
        finish: 'Matte',
        grade: 'Steel',
      },
      {
        key: '7',
        name: 'Nitrogen Disc',
        description: 'Made for those who want to cheat the wind',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 299.99,
        frameSize: '18in',
        color: 'Yellow',
        finish: 'Matte',
        grade: 'Steel',
      },
      {
        key: '8',
        name: 'Dark Matter',
        description: 'Go way off the beaten path',
        parts: ['seat', 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 599.99,
        frameSize: '18in',
        color: 'Black',
        finish: 'Chrome',
        grade: 'Aluminum',
      },
    ];

    rows.forEach((row : any) => {
      row.details = (
        <Button type='ghost' onClick={() => showModal(row)}>
          See Details
        </Button>
      );
    });

    rows.forEach((row : any) => {
      row.build = <InputNumber
        placeholder='Input a quantity'
        min={0}
        style={{ width: '100%' }}
      />;
    });

    return rows;
  },

  lineData: [
    {
      date: (new Date('2021-01-20')).toLocaleDateString(),
      numberSold: 5,
    },
    {
      date: (new Date('2021-01-21')).toLocaleDateString(),
      numberSold: 4,
    },
    {
      date: (new Date('2021-01-22')).toLocaleDateString(),
      numberSold: 7,
    },
    {
      date: (new Date('2021-01-23')).toLocaleDateString(),
      numberSold: 9,
    },
    {
      date: (new Date('2021-01-24')).toLocaleDateString(),
      numberSold: 7,
    },
    {
      date: (new Date('2021-01-25')).toLocaleDateString(),
      numberSold: 12,
    },
    {
      date: (new Date('2021-01-26')).toLocaleDateString(),
      numberSold: 8,
    },
    {
      date: (new Date('2021-01-27')).toLocaleDateString(),
      numberSold: 11,
    },
    {
      date: (new Date('2021-01-28')).toLocaleDateString(),
      numberSold: 12,
    },
    {
      date: (new Date('2021-01-29')).toLocaleDateString(),
      numberSold: 13,
    },
    {
      date: (new Date('2021-01-30')).toLocaleDateString(),
      numberSold: 13,
    },
    {
      date: (new Date('2021-01-19')).toLocaleDateString(),
      numberSold: 10,
    },
    {
      date: (new Date('2021-01-18')).toLocaleDateString(),
      numberSold: 10,
    },
  ],
};

export default data;
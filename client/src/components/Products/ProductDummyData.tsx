import React from 'react';
import { Button, InputNumber, Modal } from 'antd';

import { BicycleEntry } from '../../interfaces/BicycleEntry';

interface LinePoint {
  date : string,
  quantity : number,
  name : string,
  sold? : number,
  built? : number,
}

const data = {
  getInventoryColumns: () => ({
    name: 'Name',
    date: 'Date',
    built: 'Built',
    sold: 'Sold',
    quantity: 'Stock',
  }),

  getCatalogColumns: () => ({
    name: 'Name',
    details: 'Details',
    quantity: 'Owned',
    price: 'Price',
    build: 'Build'
  }),

  /**
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

      row.build = <InputNumber
        placeholder='Input a quantity'
        min={0}
        style={{ width: '100%' }}
      />;
    });

    return rows;
  },
  */

  getLineData: () => {
    const data : LinePoint[] = [
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 178,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 194,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 133,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 128,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Mongoose Legion L100 BMX',
        quantity: 104,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 43,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 76,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 98,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 65,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Women\'s Newport 3SPD',
        quantity: 80,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 142,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 155,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 167,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 120,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Gallium Pro Disc',
        quantity: 84,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 18,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 26,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 38,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 65,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Krypton Pro',
        quantity: 94,
      },
      {
        date: (new Date('2021-01-20')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 105,
      },
      {
        date: (new Date('2021-01-21')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 106,
      },
      {
        date: (new Date('2021-01-22')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 93,
      },
      {
        date: (new Date('2021-01-23')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 140,
      },
      {
        date: (new Date('2021-01-24')).toLocaleDateString(),
        name: 'Xenon 650',
        quantity: 176,
      },
    ];

    data.forEach((point : LinePoint, index) => {
      if (index === 0) {
        point.sold = 15;
        point.built = Math.max(point.quantity - data[index + 1].quantity, 0);
      } else if (index === data.length - 1) {
        point.sold = Math.max(point.quantity - data[index - 1].quantity, 0);
        point.built = 14;
      } else {
        point.sold = Math.max(point.quantity - data[index - 1].quantity, 0);
        point.built = Math.max(point.quantity - data[index + 1].quantity, 0);
      }
    });

    data.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });

    return data;
  },
};

export default data;

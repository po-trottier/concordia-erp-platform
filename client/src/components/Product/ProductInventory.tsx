import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { bicycleEntry } from '../../interfaces/BicycleEntry';
import Title from 'antd/lib/typography/Title';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import ProductDetails from './ProductDetails';


const data = [
  {
    date : (new Date("2021-01-20")).toLocaleDateString(),
    numberSold: 5,
  },
  {
    date : (new Date("2021-01-21")).toLocaleDateString(),
    numberSold: 4,
  },
  {
    date : (new Date("2021-01-22")).toLocaleDateString(),
    numberSold: 7,
  },
  {
    date : (new Date("2021-01-23")).toLocaleDateString(),
    numberSold: 9,
  },
  {
    date : (new Date("2021-01-24")).toLocaleDateString(),
    numberSold: 7,
  },
  {
    date : (new Date("2021-01-25")).toLocaleDateString(),
    numberSold: 12,
  },
  {
    date : (new Date("2021-01-26")).toLocaleDateString(),
    numberSold: 8,
  },
  {
    date : (new Date("2021-01-27")).toLocaleDateString(),
    numberSold: 11,
  },
  {
    date : (new Date("2021-01-28")).toLocaleDateString(),
    numberSold: 12,
  },
  {
    date : (new Date("2021-01-29")).toLocaleDateString(),
    numberSold: 13,
  },
  {
    date : (new Date("2021-01-30")).toLocaleDateString(),
    numberSold: 13,
  },
  {
    date : (new Date("2021-01-19")).toLocaleDateString(),
    numberSold: 10,
  },
  {
    date : (new Date("2021-01-18")).toLocaleDateString(),
    numberSold: 10,
  },
];

const ProductInventory = (props: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    name: '',
    description: '',
    parts: [],
    quantity: 0,
    price: 0,
    frameSize: "",
    color: "",
    finish: "",
    grade: "",
  });

  const showModal = (row: any) => {
    setIsModalVisible(true);
    setModalContent(row)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColumns = () => ({
    name: 'name',
    price: 'price',
    quantity: 'quantity',
    description: 'description',
    details: 'details'
  });

  const getRows = () => {
    const rows : bicycleEntry[] =  [
      {
        key: '1',
        name: 'Mongoose Legion L100 BMX',
        description: '10 Downing Street',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 99.99,
        frameSize: "18in",
        color: "Blue",
        finish: "Matte",
        grade: "Steel",
      },
      {
        key: '2',
        name: 'Women\'s Newport 3SPD',
        description: '10 Downing Street',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 119.99,
        frameSize: "18in",
        color: "Grey",
        finish: "Matte",
        grade: "Steel",
      },
      {
        key: '3',
        name: 'Gallium Pro Disc',
        description: 'Destined for glory',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 299.99,
        frameSize: "18in",
        color: "Red",
        finish: "Chrome",
        grade: "Aluminum",
      },
      {
        key: '4',
        name: 'Krypton Pro',
        description: 'A road-hungry endurance bike with the will to win',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 199.99,
        frameSize: "18in",
        color: "Silver",
        finish: "Matte",
        grade: "Carbon",
      },
      {
        key: '5',
        name: 'Xenon 650',
        description: 'Our popular junior racing bike',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 399.99,
        frameSize: "18in",
        color: "Black",
        finish: "Matte",
        grade: "Carbon",
      },
      {
        key: '6',
        name: 'Subito E-Gravel',
        description: 'Already looking for the next great escape',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 199.99,
        frameSize: "18in",
        color: "White",
        finish: "Matte",
        grade: "Steel",
      },
      {
        key: '7',
        name: 'Nitrogen Disc',
        description: 'Made for those who want to cheat the wind',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 17,
        price: 299.99,
        frameSize: "18in",
        color: "Yellow",
        finish: "Matte",
        grade: "Steel",
      },
      {
        key: '8',
        name: 'Dark Matter',
        description: 'Go way off the beaten path',
        parts: ["seat", 'handles', 'wheels', 'chain', 'gears'],
        quantity: 32,
        price: 599.99,
        frameSize: "18in",
        color: "Black",
        finish: "Chrome",
        grade: "Aluminum",
      },
    ];

    rows.forEach((row : bicycleEntry) => {
      row.details = <Button type='primary' onClick={() => showModal(row)}>More Details</Button>;
    });
    return rows;
  }

  return (
    <div>
      <Card style={{ marginTop: '20px' }}>
        <Title level={4} style={{ marginBottom: '24px' }}>
          Product Sales
        </Title>
        <Line
          data={data}
          xField="date"
          yField="numberSold"
          style={{ marginBottom: '48px' }} />
        <ResponsiveTable rows={getRows()} cols={getColumns()}></ResponsiveTable>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <ProductDetails
            name={modalContent.name}
            price={modalContent.price}
            quantity={modalContent.quantity}
            frameSize={modalContent.frameSize}
            parts={modalContent.parts}
            color={modalContent.color}
            finish={modalContent.finish}
            grade={modalContent.grade}
            description={modalContent.description}
          ></ProductDetails>
      </Modal>
      </Card>
    </div>
  )
}

export default ProductInventory;
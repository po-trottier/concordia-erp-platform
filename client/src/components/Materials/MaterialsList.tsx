import React from "react";
import {Card, Typography} from 'antd'

import {ResponsiveTable} from '../ResponsiveTable'
import {MaterialsListEntry} from '../../interfaces/MaterialsListEntry'
import MetalImg from '../../assets/metal.png';
import PlasticImg from '../../assets/plastic.png';
import WoodImg from '../../assets/wood.png';

const {Title} = Typography;

export const MaterialsList = () => {

  const cols = {
    img: 'Preview',
    name: 'Product',
    quantity: 'Quantity Owned',
    price: 'Price / Unit ($)'
  };

  const rows : MaterialsListEntry[] = [
    {
      img: <img src={MetalImg} alt="Metal Preview" width={32} />,
      name: "Metal",
      quantity: 30,
      price: 5
    },
    {
      img: <img src={PlasticImg} alt="Plastic Preview" width={32} />,
      name: "Plastic",
      quantity: 10,
      price: 2
    },
    {
      img: <img src={WoodImg} alt="Wood Preview" width={32} />,
      name: "Wood",
      quantity: 15,
      price: 4
    },
  ];

  return(
    <Card>
      <Title level={4} style={{ marginBottom: '24px' }}>
        Available Materials
      </Title>
      <ResponsiveTable cols={cols} rows={rows} />
    </Card>
  )
}

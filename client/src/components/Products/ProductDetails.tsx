import { Descriptions } from 'antd';
import React from 'react';

const productDetails = (props : any) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item
        label='Product Name'
        labelStyle={{ fontWeight: 'bold' }}
        span={3}>
        {props.name}
      </Descriptions.Item>
      <Descriptions.Item
        label='Price'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.price}
      </Descriptions.Item>
      <Descriptions.Item
        label='Parts'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.parts}
      </Descriptions.Item>
      <Descriptions.Item
        label='Frame Size'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.frameSize}
      </Descriptions.Item>
      <Descriptions.Item
        label='Color'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.color}
      </Descriptions.Item>
      <Descriptions.Item
        label='Finish'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.finish}
      </Descriptions.Item>
      <Descriptions.Item
        label='Grade'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.grade}
      </Descriptions.Item>
      <Descriptions.Item
        label='Quantity'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.quantity}
      </Descriptions.Item>
      <Descriptions.Item
        label='Description'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.description}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default productDetails;

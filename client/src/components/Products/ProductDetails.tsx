import React, { useEffect, useState } from 'react';
import { Descriptions, List, message } from 'antd';

import { ProductEntry } from '../../interfaces/ProductEntry';
import { PartDropdownEntry } from '../../interfaces/PartDropdownEntry';
import axios from '../../plugins/Axios';

export const ProductDetails = (props : { product: ProductEntry }) => {

  const emptyData : PartDropdownEntry[] = [];
  const [partsData, setPartsData] = useState(emptyData);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    axios.get('/parts')
      .then((res) => {
        if (res && res.data) {
          const data : PartDropdownEntry[] = [];
          res.data.forEach((p : any) => {
            data.push({
              id: p['_id'],
              name: p.name
            });
          });
          setPartsData(data);
        }
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of parts.');
        console.error(err);
      })
      .finally(() => setUpdated(true));
  }, [updated]);

  const getPartsList = () => {
    const goodParts = partsData.filter((p) =>
      props.product.parts.find((i) => i.partId === p.id)
    );

    return goodParts.map((p) => p.name).join(', ');
  };

  return (
    <Descriptions bordered>
      <Descriptions.Item
        label='Product Name'
        labelStyle={{ fontWeight: 'bold' }}
        span={3}>
        {props.product.name}
      </Descriptions.Item>
      <Descriptions.Item
        label='Price'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.product.price}
      </Descriptions.Item>
      <Descriptions.Item
        label='Stock'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {props.product.quantity}
      </Descriptions.Item>
      <Descriptions.Item
        label='Parts'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {getPartsList()}
      </Descriptions.Item>
      <Descriptions.Item
        label='Properties'
        span={3}
        labelStyle={{ fontWeight: 'bold' }}>
        {
          props.product.properties.length > 0 ?
            <List
              dataSource={props.product.properties}
              renderItem={(item) => (
                <List.Item><b>{item.key}</b> : {item.value}</List.Item>
              )} /> :
            'No additional properties were specified.'
        }
      </Descriptions.Item>
    </Descriptions>
  );
};

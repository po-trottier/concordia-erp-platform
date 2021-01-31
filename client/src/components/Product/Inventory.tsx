import React from 'react';
import { Card, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductDetails from './ProductDetails';
import { bicycle } from '../../interfaces/Bicycle';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a : any, b : any) => a.name.localeCompare(b.name),
        multiple: 3,
      },
      responsive: ["sm"] as Breakpoint[],
    },
    {
      title: 'Price (CAD)',
      dataIndex: 'price',
      key: 'price',
      sorter: {
        compare: (a : any, b : any) => a.price - b.price,
        multiple: 1,
      },
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: {
        compare: (a : any, b : any) => a.quantity - b.quantity,
        multiple: 2,
      },
      responsive: ["sm"] as Breakpoint[]
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ["sm"] as Breakpoint[]
    },
];

const data : bicycle[] =  [
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
      grade: "Steel"
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
      grade: "Steel"
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
      grade: "Aluminum"
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
      grade: "Carbon"
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
      grade: "Carbon"
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
      grade: "Steel"
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
      grade: "Steel"
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
      grade: "Aluminum"
    },
];

const inventory = (props: any) => {
    return (
        <div>
            <Card style={{ marginTop: '20px' }}>
                <Table 
                    expandable={{
                        expandedRowRender: function displayProductDetails(record) {
                            return (
                                <ProductDetails 
                                    name={record.name} 
                                    price={record.price} 
                                    parts={record.parts.join(", ")} 
                                    frameSize={record.frameSize} 
                                    color={record.color} 
                                    finish={record.finish}                
                                    grade={record.grade} 
                                    quantity={record.quantity}
                                    description={record.description}>
                                </ProductDetails>
                            );
                        }
                    }}
                    dataSource={data} 
                    columns={columns}>
                </Table>
                <Button type="primary" icon={<PlusOutlined />}>Add Product</Button>
            </Card>
        </div>
    )
}

export default inventory;
import React, { useState } from "react";
import { Layout, Card, Table, Space, Tabs } from 'antd';
import { LineChartOutlined, DatabaseOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export const Products = () => {
  const [productState, setProductState] = useState()
  
  return <h1>hey from products</h1>
} 





// const productList = [
//     {
//       key: '1',
//       name: 'Mongoose Legion L100 BMX 20inch wheel 2020 Blue',
//       quantity: 32,
//       description: '10 Downing Street',
//     },
//     {
//       key: '2',
//       name: 'Women\'s Newport 3SPD',
//       quantity: 42,
//       description: '10 Downing Street',
//     },
// ];

// const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       key: 'quantity',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
// ];

// const tabsList = ['Inventory', 'Trends'];

// const inventory = (
//     <Table dataSource={productList} columns={columns}></Table>
// );

// export const Products = () => {
//     return (
//         <div>
//             <Tabs defaultActiveKey="1">
//                 <TabPane tab={<span><DatabaseOutlined />Inventory</span>} key="1">
//                     {inventory}
//                     <button>Add Bicycle</button>    
//                 </TabPane>
//                 <TabPane tab={<span><LineChartOutlined />Trends</span>} key="2">
//                     Content of Tab Pane 2
//                 </TabPane>
//                 <TabPane tab="Tab 3" key="3">
//                     Content of Tab Pane 3
//                 </TabPane>
//             </Tabs>
//         </div>
//     )
// } 
import React, { useState } from "react";
import { DatabaseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Menu } from 'antd';
import Inventory from "../components/Product/ProductInventory";


export const Products = (props: any) => {
  const [productState, setProductState] = useState("inventory");

  let updateTableState = (e: any) => {
    setProductState(e.key);
  };

  let switchTabs = () => {
    switch (productState) {
      case "inventory":
        return <Inventory />;
      case "addProduct":
        return <Card><Button type="primary" icon={<PlusOutlined />}>Add Product</Button></Card>;
      default:
        return <Inventory />;
    }
  };

  return (
        <div>
          <Menu defaultSelectedKeys={['inventory']} onClick={updateTableState} mode="horizontal">
            <Menu.Item icon={<DatabaseOutlined />} key="inventory">
              Inventory
            </Menu.Item>
            <Menu.Item icon={<PlusOutlined />} key="addProduct">
              Add Product
            </Menu.Item>
          </Menu>
          {switchTabs()}
        </div>
    );
}

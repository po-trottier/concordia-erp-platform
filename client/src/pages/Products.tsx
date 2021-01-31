import React, { useState } from "react";
import { LineChartOutlined, DatabaseOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Inventory from "../components/Product/Inventory";
import Trend from "../components/Product/Trend";
 

export const Products = (props: any) => {
  const [productState, setProductState] = useState("inventory");

  let updateTableState = (e: any) => {
    setProductState(e.key);
  };

  let switchTabs = () => {
    switch (productState) {
      case "inventory":
        return <Inventory />;
      case "trends":
        return <Trend />;
      default:
        return <Inventory />;
    }
  };

  return (
        <div>
          <Menu defaultSelectedKeys={['inventory']} onClick={updateTableState} mode="horizontal">
            <Menu.Item icon={<DatabaseOutlined />} key="inventory" >
              Inventory
            </Menu.Item>
            <Menu.Item icon={<LineChartOutlined />} key="trends">
              Trends
            </Menu.Item>
          </Menu>
          {switchTabs()}
        </div>
    );
} 

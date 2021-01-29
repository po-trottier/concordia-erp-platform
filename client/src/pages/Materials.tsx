import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import { List, Typography, Divider } from 'antd';

export const Materials = () => {

  interface IMaterial {
    name: string;
    quantity: number;
    weight: number;
    price: number;
  }

  const materialsData: IMaterial[] = [];
  const [materials, setMaterials] = useState<IMaterial[]|undefined>(undefined);
  const [materialName, setMaterialName] = useState("");
  const [materialQty, setMaterialQty] = useState();
  const [materialUnit, setMaterialUnit] = useState();
  const [materialPrice, setMaterialPrice] = useState();
  materialsData[0] = {name: "cookie", quantity: 1, weight: 1, price: 1};
  materialsData[1] = {name: "cookie2", quantity: 1, weight: 1, price: 1};

  let updateState = (e:any) =>
  {
    console.log(materials);
    setMaterials(materialsData);
  } 
  return(
    <div>    
      <h1>Materials</h1>
      <Button type="primary" onClick={updateState}>Primary Button</Button>
      <Divider orientation="left">Available</Divider>
    <List
      bordered
      dataSource={materials}
      renderItem={item => (
        <List.Item>
          {item.name} <h1>Buy</h1>
        </List.Item>
      )}
    />
    </div>
  )
}

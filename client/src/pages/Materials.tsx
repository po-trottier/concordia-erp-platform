import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {Button} from 'antd';

export const Materials = () => {

  interface IMaterial {
    name: string;
    quantity: number;
    weight: number;
    price: number;
  }

  const materialsData: IMaterial[] = [];
  const [materials, setMaterials] = useState(materialsData);
  const [materialName, setMaterialName] = useState("");
  const [materialQty, setMaterialQty] = useState();
  const [materialUnit, setMaterialUnit] = useState();
  const [materialPrice, setMaterialPrice] = useState();

  let updateState = (e:any) =>
  {
    materialsData[0] = {name: "cookie", quantity: 1, weight: 1, price: 1};
    console.log(materials);
  }

  let renderName = () => {
    if (materialsData.length == 0){
      console.log(materialsData)
      return "metal";
    }

    return materialsData[0];
  }
  return(
    <div>    
      <h1>Materials</h1>
      <Button type="primary" onClick={updateState}>Primary Button</Button>
      <h1>{renderName()}</h1>
    </div>
  )
}

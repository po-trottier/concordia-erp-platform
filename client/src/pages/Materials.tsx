import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import { Divider } from 'antd';
import { Table, Space } from 'antd';
import {MaterialTimeline} from '../components/Material/MaterialTimeline';
import MetalImg from '../assets/metal.png';
import PlasticImg from '../assets/plastic.png';
import WoodImg from '../assets/wood.png';


export const Materials = () => {

  interface IMaterial {
    name: string;
    quantity: number;
    price: number;
    img: string;
  }

  const materialsData: IMaterial[] = [];
  const [materials, setMaterials] = useState<IMaterial[]|undefined>([{img: MetalImg, name: "Metal", quantity: 30, price: 5},{img: PlasticImg, name: "Plastic", quantity: 10, price: 2}]);
  const [materialName, setMaterialName] = useState("");
  const [materialQty, setMaterialQty] = useState();
  const [materialPrice, setMaterialPrice] = useState();
  const [trackedMat, setTrackedMat] = useState("");
  materialsData[0] = {img: '../assets/metal.png', name: "Metal", quantity: 30, price: 5};
  materialsData[1] = {img: '../assets/plastic.png', name: "Plastic", quantity: 10, price: 2};
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // eslint-disable-next-line react/display-name
      render: (text: string, record: IMaterial) => (
        <p>
          <img src={record.img} alt={record.name+" img"} width="30 px"/>
          {record.name}
        </p>
      ),
    },
    {
      title: 'Quantity Owned',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price / Unit ($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text: string, record: IMaterial) => (
        <Space size="middle">
          <a>Buy More</a>
        </Space>
      ),
    },
  ];

  let updateState = (e:any) =>
  {
    materialsData.push({img: '../assets/wood.png', name: "Wood", quantity: 3, price: 1})
    setMaterials(materialsData);
  }

  let track = () =>
  {
    materials?.forEach(mat => {
      if (mat.name == trackedMat){
        return <h1>material found</h1>;
      }
    });
    return <h1>no material tracked</h1>
  }
  return(
    <div> {updateState}    
      <h1>Materials</h1>
      <Divider orientation="left">Current Stock</Divider>
      <Table columns={columns} dataSource={materials}/>
      <Divider orientation="left">Additional Options</Divider>
      <Button type="primary" onClick={updateState}>Create a material</Button>
      <MaterialTimeline></MaterialTimeline>
    </div>
  )
}

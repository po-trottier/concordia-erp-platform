import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Input, InputNumber, Select, Divider} from 'antd';
import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';
import { PartEntry } from '../../interfaces/PartEntry';
import axios from '../../plugins/Axios'

const { Search } = Input;
const { Option } = Select;

export const ProductCatalog = () => {
  const [tableData, setTableData] = useState(dummyData.getRows());
  const [searchValue, setSearchValue] = useState('');
  const [partsData, setPartsData] = useState([]);

  useEffect(() => {
    let rows = dummyData.getRows();
    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    setTableData(rows);
  }, [searchValue]);

  useEffect(() => {
    let rows : any = [{name:'Pink Tassels', id:'23'}, {name:'Hot wheel', id:'42'}, {name:'Bike Frame', id:'22'}];

    setPartsData(rows);
  });

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        <ResponsiveTable rows={tableData} cols={dummyData.getCatalogColumns()} />
      </Card>
      <Button type='ghost' onClick={showModal}>
        Define a new Product
      </Button>
      <Button type='primary' style={{ float: 'right' }}>
        Build Products
      </Button>
      <Modal title="Define Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h2>Name</h2>
        <Input placeholder="Product Name"/>
        <Divider/>
        <h2>Quantity</h2>
        <InputNumber 
          defaultValue={0}  
          /* formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */
          /* parser={value => value.replace(/\$\s?|(,*)/g, '')} */ 
        />
        <Divider/>
        <h2>Select Parts</h2>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          //filterOption={(input, option) =>
          //  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          //}
          //filterSort={(optionA, optionB) =>
          //  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          //}
        >
          {partsData.map((part : any) => {
              return (<Option key={part.id} value="1">{part.name}</Option>)
            })}
        </Select>
      </Modal>
    </div>
  );
};

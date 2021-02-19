import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Input, InputNumber, Select } from 'antd';
import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';

const { Search } = Input;
const { Option } = Select;

export const ProductCatalog = () => {
  const [tableData, setTableData] = useState(dummyData.getRows());
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = dummyData.getRows();
    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    setTableData(rows);
  }, [searchValue]);

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
        <Input placeholder="Product Name"/>
        <InputNumber defaultValue={0} />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
        >
          <Option value="1">Not Identified</Option>
          <Option value="2">Closed</Option>
          <Option value="3">Communicated</Option>
          <Option value="4">Identified</Option>
          <Option value="5">Resolved</Option>
          <Option value="6">Cancelled</Option>
        </Select>,
      </Modal>
    </div>
  );
};

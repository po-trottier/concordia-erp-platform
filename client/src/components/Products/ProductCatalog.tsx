import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Input, InputNumber, Select, Divider} from 'antd';
import dummyData from './ProductDummyData';
import { ResponsiveTable } from '../ResponsiveTable';
import {CreateProductModal } from './CreateProductModal'
import axios from '../../plugins/Axios'

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

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        <ResponsiveTable rows={tableData} cols={dummyData.getCatalogColumns()} />
      </Card>
      <Button type='primary' style={{ marginTop: 16, float: 'right' }}>
        Build Products
      </Button>
      <CreateProductModal/>
    </div>
  );
};

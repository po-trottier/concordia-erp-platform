import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import { ProductHistoryEntry } from '../../interfaces/ProductHistoryEntry';
import axios from '../../plugins/Axios';

const { Search } = Input;

const inventoryColumns = {
  name: 'Name',
  date: 'Date',
  stockBuilt: 'Built',
  stockUsed: 'Used',
  stock: 'Stock',
};

export const ProductInventory = () => {
  const emptyData : ProductHistoryEntry[] = [];
  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('products/logs').then(async ({ data }) => {
      let rows = data;
      const allProducts = await axios.get('products').then(({ data }) => data);

      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        row.date = new Date(row.date).toLocaleDateString();
        row.name = allProducts.find(
          (product : any) => product._id === row.productId
        ).name;
      }

      rows.sort((a : any, b : any) => {
        const dateA = a.date;
        const dateB = b.date;
        return dateA < dateB ? -1 : 1;
      });

      if (searchValue.trim() !== '') {
        rows = rows.filter((row : any) =>
          row.name
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        );
      }

      setTableData(rows);
    });
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product transaction'
          onChange={onSearch}
          style={{ marginBottom: 18 }}
        />
        {
          tableData.length > 0 ?
            <Line
              data={tableData}
              xField='date'
              yField='stock'
              seriesField='name' /> :
            <span>No product transactions were found.</span>
        }
      </Card>
      <Card style={{ display: tableData.length > 0 ? 'block' : 'none' }}>
        <ResponsiveTable rows={tableData} cols={inventoryColumns} />
      </Card>
    </div>
  );
};

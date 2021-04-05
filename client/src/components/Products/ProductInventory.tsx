import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import { ProductHistoryEntry } from '../../interfaces/ProductHistoryEntry';
import { RootState } from '../../store/Store';
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
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData : ProductHistoryEntry[] = [];
  const [products, setProducts] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('products/logs/' + location)
      .then(async ({ data }) => {
        for (const row of data) {
          row.date = new Date(row.date).toLocaleDateString();
          if (row.isEstimate)
            row.date = row.date + " (estimate)";
          row.name = row.productId.name;
        }
        setProducts(data);
      });
  }, [location]);

  const getProducts = () => {
    let rows = JSON.parse(JSON.stringify(products));

    if (searchValue.trim() !== '') {
      rows = rows.filter((row : any) =>
        row.name
          .trim()
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase())
      );
    }

    rows.sort((a : any, b : any) => {
      const dateA = a.date;
      const dateB = b.date;
      return dateA < dateB ? -1 : 1;
    });

    return rows;
  }

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product transaction'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          getProducts().length > 0 ?
            <Line
              data={getProducts()}
              xField='date'
              yField='stock'
              seriesField='name' /> :
            <span>No product transactions were found.</span>
        }
      </Card>
      <Card style={{ display: getProducts().length > 0 ? 'block' : 'none' }}>
        <ResponsiveTable values={getProducts()} columns={inventoryColumns} />
      </Card>
    </div>
  );
};

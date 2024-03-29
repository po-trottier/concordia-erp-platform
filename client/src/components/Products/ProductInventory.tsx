import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import axios from '../../plugins/Axios';
import Chart from 'react-apexcharts';
import { ResponsiveTable } from '../ResponsiveTable';
import { ProductHistoryEntry } from '../../interfaces/ProductHistoryEntry';
import { RootState } from '../../store/Store';
import { getChartState } from '../../store/slices/ChartSlice';

const { Search } = Input;

const inventoryColumns = {
  name: 'Name',
  date: 'Date',
  stockBuilt: 'Built',
  stockUsed: 'Used',
  stock: 'Stock',
};

export const ProductInventory = () => {
  const dispatch = useDispatch();

  const location = useSelector((state : RootState) => state.location.selected);
  const chartData = useSelector((state : RootState) => state.chart.chartState);

  const emptyData : ProductHistoryEntry[] = [];
  const [products, setProducts] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('products/logs/' + location)
      .then(async ({ data }) => {
        for (const row of data) {
          row.date = new Date(row.date).toLocaleDateString('en-US');
          row.name = row.productId.name + (row.isEstimate ? ' (estimate)' : '');
        }
        setProducts(data);
        dispatch(getChartState(data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    return rows;
  };

  const getChartData = () => {
    return JSON.parse(JSON.stringify(chartData));
  };

  const getTableData = () => {
    return getProducts().filter((row : any) => !row.isCopy);
  };

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
            <Chart {...getChartData()} type='line' height={350} /> :
            <span>No product transactions were found.</span>
        }
      </Card>
      <Card style={{ display: getProducts().length > 0 ? 'block' : 'none' }}>
        <ResponsiveTable values={getTableData()} columns={inventoryColumns} />
      </Card>
    </div>
  );
};

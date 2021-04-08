import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import axios from '../../plugins/Axios';
import Chart from 'react-apexcharts';
import { ResponsiveTable } from '../ResponsiveTable';
import { PartHistoryEntry } from '../../interfaces/PartHistoryEntry';
import { RootState } from '../../store/Store';
import { getChartState } from '../../store/slices/ChartSlice';

const { Search } = Input;

const inventoryColumns = {
  name: 'Part',
  date: 'Date',
  stockBuilt: 'Built',
  stockUsed: 'Used',
  stock: 'Stock',
};

export const PartInventory = () => {
  const dispatch = useDispatch();

  const location = useSelector((state : RootState) => state.location.selected);
  const chartData = useSelector((state : RootState) => state.chart.chartState);

  const emptyData : PartHistoryEntry[] = [];
  const [partsData, setPartsData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('parts/logs/' + location).then(async ({ data }) => {
      for (const row of data) {
        row.date = new Date(row.date).toLocaleDateString('en-US');
        row.name = row.partId.name + (row.isEstimate ? ' (estimate)' : '');
      }
      setPartsData(data);
      dispatch(getChartState(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const getParts = () => {
    let rows = JSON.parse(JSON.stringify(partsData));

    if (searchValue.trim() !== '') {
      rows = rows.filter((row : any) =>
        row.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }

    return rows;
  };

  const getChartData = () => {
    return JSON.parse(JSON.stringify(chartData));
  };

  const getTableData = () => {
    return getParts().filter((row : any) => !row.isCopy);
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a part transaction'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {getParts().length > 0 ?
          <Chart {...getChartData()} type='line' height={350} /> :
          <span>No part transactions were found.</span>
        }
      </Card>
      {getParts().length > 0 ? (
        <Card>
          <ResponsiveTable values={getTableData()} columns={inventoryColumns} />
        </Card>
      ) : null}
    </div>
  );
};

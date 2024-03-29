import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import Chart from 'react-apexcharts';
import axios from '../../plugins/Axios';
import { ResponsiveTable } from '../ResponsiveTable';
import { MaterialsTimelineEntry } from '../../interfaces/MaterialsTimelineEntry';
import { RootState } from '../../store/Store';
import { getChartState } from '../../store/slices/ChartSlice';

const { Search } = Input;

const inventoryColumns = {
  name: 'Material',
  date: 'Date',
  stockBought: 'Bought',
  stockUsed: 'Used',
  stock: 'Stock'
};

export const MaterialsInventory = () => {
  const dispatch = useDispatch();

  const location = useSelector((state : RootState) => state.location.selected);
  const chartData = useSelector((state : RootState) => state.chart.chartState);

  const emptyData : MaterialsTimelineEntry[] = [];
  const [materialsData, setMaterialsData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('materials/logs/' + location)
      .then(async ({ data }) => {
        for (const row of data) {
          row.date = new Date(row.date).toLocaleDateString('en-US');
          row.name = row.materialId.name + (row.isEstimate ? ' (estimate)' : '');
        }
        setMaterialsData(data);
        dispatch(getChartState(data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const getMaterials = () => {
    let rows = JSON.parse(JSON.stringify(materialsData));

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
    return getMaterials().filter((row : any) => !row.isCopy);
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a material transaction'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {getMaterials().length > 0 ?
          <Chart {...getChartData()} type='line' height={350} /> :
          <span>No material transactions were found.</span>
        }
      </Card>
      {getMaterials().length > 0 ?
        <Card>
          <ResponsiveTable values={getTableData()} columns={inventoryColumns} />
        </Card> : null
      }
    </div>
  );
};

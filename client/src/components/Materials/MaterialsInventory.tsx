import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import { MaterialsTimelineEntry } from '../../interfaces/MaterialsTimelineEntry';
import axios from '../../plugins/Axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import Chart from "react-apexcharts";
import { getChartState, getTableData } from "../../shared/predictions";

const { Search } = Input;

const inventoryColumns = {
  name: 'Material',
  date: 'Date',
  stockBought: 'Bought',
  stockUsed: 'Used',
  stock: 'Stock'
};

export const MaterialsInventory = () => {
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData : MaterialsTimelineEntry[] = [];
  const [materialsData, setMaterialsData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('materials/logs/' + location)
      .then(async ({ data }) => {
        for (const row of data) {
          row.date = row.date.substring(0,10);
          row.name = row.materialId.name + (row.isEstimate ? ' (estimate)' : '');
        }
        setMaterialsData(data);
      });
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
          <Chart {...getChartState(getMaterials())} type="line" height={350} />
          :
          <span>No material transactions were found.</span>
        }
      </Card>
      {getMaterials().length > 0 ?
      <Card>
        <ResponsiveTable values={getTableData(getMaterials())} columns={inventoryColumns} />
      </Card> : null
      }
    </div>
  );
};

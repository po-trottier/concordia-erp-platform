import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import { MaterialsTimelineEntry } from '../../interfaces/MaterialsTimelineEntry';
import axios from '../../plugins/Axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';

const { Search } = Input;

const inventoryColumns = {
  name: 'material',
  date: 'Date',
  stockBought: 'Bought',
  stockUsed: 'Used',
  stock: 'stock'
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
          row.date = new Date(row.date).toLocaleDateString();
          row.name = row.materialId.name;
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

    rows.sort((a : any, b : any) => {
      const dateA = a.date;
      const dateB = b.date;
      return dateA < dateB ? -1 : 1;
    });

    return rows;
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a material'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {getMaterials().length > 0 ?
          <Line
            data={getMaterials()}
            xField='date'
            yField='stock'
            seriesField='name'
            style={{ marginBottom: '48px' }} /> :
          <span>No material timeline was found.</span>
        }
      </Card>
      <Card>
        <ResponsiveTable rows={getMaterials()} cols={inventoryColumns} />
      </Card>
    </div>
  );
};
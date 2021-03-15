import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import { MaterialsTimelineEntry } from '../../interfaces/MaterialsTimelineEntry';
import axios from '../../plugins/Axios';

const { Search } = Input;

const inventoryColumns = {
  name: 'material',
  date: 'Date',
  stockBought: 'Bought',
  stockUsed: 'Used',
  stock: 'stock'
}

export const MaterialsInventory = () => {
  const emptyData: MaterialsTimelineEntry[] = [];
    const [tableData, setTableData] = useState(emptyData);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
      axios.get('materials/logs').then(async ({ data }) => {
        let rows = data;
        const allMaterials = await axios.get('materials').then(({ data }) => data);
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          row.date = new Date(row.date).toLocaleDateString();
          if (!row.name)
            continue;
          row.name = allMaterials.find(
            (material : any) => material._id === row.materialId
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
          placeholder='Search for a material'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        { tableData.length > 0 ?
        <Line
          data={tableData}
          xField='date'
          yField='stock'
          seriesField='material'
          style={{ marginBottom: '48px' }} /> :
          <span>No material timeline was found.</span>
        }
      </Card>
      <Card>
        <ResponsiveTable rows={tableData} cols={inventoryColumns} />
      </Card>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { useSelector } from 'react-redux';
import { ResponsiveTable } from '../ResponsiveTable';
import { PartHistoryEntry } from '../../interfaces/PartHistoryEntry';
import { RootState } from '../../store/Store';
import axios from '../../plugins/Axios';

const { Search } = Input;

const inventoryColumns = {
  name: 'Part',
  date: 'Date',
  stockBuilt: 'Built',
  stockUsed: 'Used',
  stock: 'Stock',
};

export const PartInventory = () => {
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData : PartHistoryEntry[] = [];
  const [partsData, setPartsData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('parts/logs/' + location).then(async ({ data }) => {
      for (const row of data) {
        row.date = new Date(row.date).toLocaleDateString();
        if (row.isEstimate)
          row.date = row.date + ' (estimate)';
        row.name = row.partId.name;
      }
      setPartsData(data);
    });
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
        {getParts().length > 0 ? (
          <Line
            data={getParts()}
            xField='date'
            yField='stock'
            seriesField='name'
            style={{ marginBottom: '48px' }} />
        ) : (
          <span>No part transactions were found.</span>
        )}
      </Card>
      {getParts().length > 0 ? (
        <Card>
          <ResponsiveTable values={getParts()} columns={inventoryColumns} />
        </Card>
      ) : null}
    </div>
  );
};

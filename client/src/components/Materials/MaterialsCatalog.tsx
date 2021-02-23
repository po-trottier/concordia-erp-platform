import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { MaterialsListEntry } from '../../interfaces/MaterialsListEntry';
import MetalImg from '../../assets/metal.png';
import PlasticImg from '../../assets/plastic.png';
import WoodImg from '../../assets/wood.png';
import GoldImg from '../../assets/gold.png';

import { CreateMaterialModal } from './CreateMaterialModal';

const { Search } = Input;

export const MaterialsCatalog = () => {
  const cols = {
    img: 'Preview',
    name: 'Product',
    quantity: 'Owned',
    price: 'Price',
    order: 'Order',
  };

  const rows : MaterialsListEntry[] = [
    {
      img: <img src={MetalImg} alt='Metal Preview' width={32} />,
      name: 'Metal',
      quantity: 30,
      price: 5,
    },
    {
      img: <img src={PlasticImg} alt='Plastic Preview' width={32} />,
      name: 'Plastic',
      quantity: 10,
      price: 2,
    },
    {
      img: <img src={WoodImg} alt='Wood Preview' width={32} />,
      name: 'Wood',
      quantity: 15,
      price: 4,
    },
  ];

  const data : any[] = rows;
  data.forEach((row) => {
    row.order = <InputNumber
      placeholder='Input a quantity'
      min={0}
      style={{ width: '100%' }}
    />;
  });

  const [tableData, setTableData] = useState(data);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let rows = data;
    if (searchValue.trim() !== '') {
      rows = rows.filter((m) =>
        m.name.toLowerCase().includes(searchValue.trim().toLowerCase(),
        ));
    }
    setTableData(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for a material'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        <ResponsiveTable cols={cols} rows={tableData} />
      </Card>
      <Button
        type='primary'
        style={{ marginTop: 16, float: 'right' }}>
        Order Materials
      </Button>
      <CreateMaterialModal/>
    </div>
  );
};

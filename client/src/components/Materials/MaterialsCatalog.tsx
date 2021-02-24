import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { MaterialsListEntry } from '../../interfaces/MaterialsListEntry';
import MetalImg from '../../assets/metal.png';
import PlasticImg from '../../assets/plastic.png';
import WoodImg from '../../assets/wood.png';

import { CreateMaterialModal } from './CreateMaterialModal';

const { Search } = Input;

export const MaterialsCatalog = () => {
  const cols = {
    img: 'Preview',
    name: 'Product',
    density: 'Density',
    stock: 'Stock',
    price: 'Price',
    vendor: 'Vendor',
    actions: 'Actions',
    order: 'Order',
  };

  const rows : MaterialsListEntry[] = [
    {
      img: <img src={MetalImg} alt='Metal Preview' width={32} />,
      name: 'Metal',
      stock: 30,
      price: 5,
      density: '2 kg/unit',
      vendor: 'Some Vendor',
    },
    {
      img: <img src={PlasticImg} alt='Plastic Preview' width={32} />,
      name: 'Plastic',
      stock: 10,
      price: 2,
      density: '5 kg/unit',
      vendor: 'Other Vendor',
    },
    {
      img: <img src={WoodImg} alt='Wood Preview' width={32} />,
      name: 'Wood',
      stock: 15,
      price: 4,
      density: '1.5 kg/unit',
      vendor: 'Some Vendor',
    },
  ];

  const data : any[] = rows;
  data.forEach((row) => {
    row.order = <InputNumber
      placeholder='Input a quantity'
      min={0}
      style={{ width: '100%' }}
    />;
    row.actions = (
      <Button type='ghost' size='small' style={{ width: 64 }}>
        Edit
      </Button>
    );
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
      <CreateMaterialModal />
    </div>
  );
};

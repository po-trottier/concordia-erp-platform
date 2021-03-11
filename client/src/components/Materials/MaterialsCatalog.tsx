import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ResponsiveTable } from '../ResponsiveTable';
import { CreateMaterialModal } from './CreateMaterialModal';
import { EditMaterialModal } from './EditMaterialModal';
import { RootState } from '../../store/Store';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { MaterialStockEntry } from '../../interfaces/MaterialStockEntry';
import { setMaterialList } from '../../store/slices/MaterialListSlice';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const MaterialsCatalog = () => {
  const dispatch = useDispatch();

  const materials = useSelector((state : RootState) => state.materialList.list);
  const updated = useSelector((state : RootState) => state.materialList.updated);
  const location = useSelector((state : RootState) => state.location.selected);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/materials')
      .then(({ data }) => {
        axios.get('/materials/stock/' + location)
          .then((resp) => {
            data.forEach((mat : MaterialEntry) => {
              const entry = resp.data.find((m : MaterialStockEntry) => m.materialId === mat.id);
              if (entry) {
                mat.stock = entry.stock;
              } else {
                mat.stock = 0;
              }
            });
            dispatch(setMaterialList(data));
          })
          .catch((err) => {
            message.error('Something went wrong while getting the materials stock.');
            console.error(err);
          });
      })
      .catch((err) => {
        message.error('Something went wrong while getting the materials catalog.');
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, location]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getMaterials = () => {
    let rows = JSON.parse(JSON.stringify(materials));

    if (searchValue.trim() !== '') {
      rows = rows.filter(
        (r : MaterialEntry) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
    }

    rows.forEach((row : any) => {
      row.id = row['_id'];
      row.actions = <EditMaterialModal material={row} />;
      row.imageNode = <img src={row.image} height={32} alt='Material Preview' />;
      row.order = (
        <InputNumber
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }} />
      );
    });

    rows.sort((a : MaterialEntry, b : MaterialEntry) => {
      return a.name < b.name ? -1 : 1;
    });

    return rows;
  };

  const columns = {
    imageNode: 'Preview',
    name: 'Material',
    density: 'Density',
    stock: 'Stock',
    price: 'Price',
    vendorName: 'Vendor',
    actions: 'Actions',
    order: 'Order',
  };

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for a material'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          getMaterials().length > 0 ?
            <ResponsiveTable cols={columns} rows={getMaterials()} /> :
            <span>No materials were found.</span>
        }
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

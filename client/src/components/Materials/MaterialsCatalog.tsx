import React, { useEffect, useState } from 'react';
import { Card, Input, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ResponsiveTable } from '../ResponsiveTable';
import { CreateMaterialModal } from './CreateMaterialModal';
import { EditMaterialModal } from './EditMaterialModal';
import { OrderMaterialButtons } from './OrderMaterialButtons';
import { RootState } from '../../store/Store';
import { MaterialEntry } from '../../interfaces/MaterialEntry';
import { setMaterialList, updateMaterialEntry } from '../../store/slices/MaterialListSlice';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const MaterialsCatalog = () => {
  const dispatch = useDispatch();

  const materials = useSelector((state : RootState) => state.materialList.list);
  const updated = useSelector((state : RootState) => state.materialList.updated);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/materials')
      .then(({ data }) => {
        dispatch(setMaterialList(data));
      })
      .catch((err) => {
        message.error('Something went wrong while getting the materials catalog.');
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

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
      const index = materials.findIndex((material : any) => material._id === row.id);
      row.actions = <EditMaterialModal material={row} />;
      row.imageNode = <img src={row.image} height={32} alt='Material Preview' />;
      row.order = (
        <InputNumber
          value={materials[index].quantity == 0 ? undefined : materials[index].quantity}
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }}
          onChange={(value : any) => updateMaterialQuantity(row.id, value)} />
      );
    });

    rows.sort((a : MaterialEntry, b : MaterialEntry) => {
      return a.name < b.name ? -1 : 1;
    });

    return rows;
  };

  const updateMaterialQuantity = (id : string, quantity : number) => {
    const oldMaterial : MaterialEntry = materials.find((material : any) => {
      return material._id === id;
    });

    const newMaterial : MaterialEntry = {
      ...oldMaterial,
      quantity
    }

    axios.patch('/materials/' + id, newMaterial)
    .then(({ data }) => {
      const newMaterial = data;
      newMaterial.id = data['_id'];
      dispatch(updateMaterialEntry({
        id,
        newMaterial
      }));
    })
    .catch((err) => {
      message.error('Something went wrong while updating the order.');
      console.error(err);
    })
  }

  const columns = {
    imageNode: 'Preview',
    name: 'Material',
    density: 'Density',
    stock: 'Stock',
    price: 'Price',
    vendorName: 'Vendor',
    actions: 'Actions',
    order: 'Order Quantity',
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
      <OrderMaterialButtons />
      <CreateMaterialModal />
    </div>
  );
};

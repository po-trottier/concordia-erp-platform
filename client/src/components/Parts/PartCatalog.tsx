import React, { useEffect, useState } from 'react';
import { Button, Card, Input, InputNumber, message } from 'antd';

import { ResponsiveTable } from '../ResponsiveTable';
import { CreatePartModal } from './CreatePartModal';
import { EditPartModal } from './EditPartModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { PartEntry } from '../../interfaces/PartEntry';
import { PartStockEntry } from '../../interfaces/PartStockEntry';
import { PartOrderItem } from '../../interfaces/PartOrderItem';
import { MaterialDropdownEntry } from '../../interfaces/MaterialDropdownEntry';
import { setPartList } from '../../store/slices/PartListSlice';
import axios from '../../plugins/Axios';

const { Search } = Input;

export const PartCatalog = () => {
  const dispatch = useDispatch();

  const parts = useSelector((state : RootState) => state.partList.list);
  const updated = useSelector((state : RootState) => state.partList.updated);
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData : MaterialDropdownEntry[] = [];
  const [searchValue, setSearchValue] = useState('');
  const [materialsData, setMaterialsData] = useState(emptyData);

  const emptyPartOrder: PartOrderItem[] = [];
  const [partOrders, setPartOrders] = useState(emptyPartOrder);

  useEffect(() => {
    axios.get('/parts')
      .then(({ data }) => {
        data.forEach((d : any) => {
          d.id = d['_id'];
        });
        axios.get('/parts/stock/' + location)
          .then((resp) => {
            data.forEach((part : PartEntry) => {
              const entry = resp.data.find((p : PartStockEntry) => p.partId === part.id);
              if (entry) {
                part.quantity = entry.stock;
              } else {
                part.quantity = 0;
              }
            });
            dispatch(setPartList(data));
          })
          .catch((err) => {
            message.error('Something went wrong while getting the parts stock.');
            console.error(err);
          });
      })
      .catch((err) => {
        message.error('Something went wrong while getting the part catalog.');
        console.error(err);
      });
    axios.get('/materials')
      .then(({ data }) => {
        data.forEach((d : any) => {
          d.id = d['_id'];
        });
        setMaterialsData(data);
      })
      .catch(err => {
        message.error('Something went wrong while fetching the list of materials.');
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, location]);

  const updatePartStocks = (response: any) => {
    const clone = JSON.parse(JSON.stringify(parts));
    response.data.forEach((updatedProductLocationStock: any) => {
      const foundClone = clone.find((clone: any) => clone.id === updatedProductLocationStock.productId._id);
      foundClone.stock = updatedProductLocationStock.stock;
    });
    dispatch(setPartList(clone));
  }

  const getMaterials = (part : PartEntry) => {
    const mats = materialsData.filter((m) => part.materials.find((i) => i.materialId === m.id));
    if (mats.length < 1) {
      return <i>None</i>;
    }
    return mats.map((m) => m.name).join(', ');
  };

  const changeBuildAmount = (partId: string, buildAmount: number) => {
    const foundOrder = partOrders.find(
      (order: PartOrderItem) => order.partId === partId
    );
    if (foundOrder) {
      foundOrder.buildAmount = buildAmount;
      setPartOrders(partOrders);
    } else {
      setPartOrders(partOrders.concat({ partId, buildAmount }));
    }
  };

  const getParts = () => {
    let rows = JSON.parse(JSON.stringify(parts));

    if (searchValue) {
      rows = rows.filter(
        (part : PartEntry) => part.name.toLowerCase().includes(searchValue)
      );
    }

    rows.forEach((row : PartEntry) => {
      row.build = (
        <InputNumber onChange={(value: any) => changeBuildAmount(row.id, value)}
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }} />
      );
      row.actions = <EditPartModal part={row} />;
      row.materialsString = getMaterials(row);
    });

    return rows;
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchValue(value);
  };

  const buildParts = () => {
    axios.patch('parts/build/' + location, partOrders)
      .then((data) => {
        updatePartStocks(data);
        message.success('The parts were built successfully.');
      }).catch((err) => {
      message.error('There are not enough materials to build the parts.');
      console.log(err);
    });
  };


  const columns = {
    name: 'Part Name',
    materialsString: 'Materials',
    quantity: 'Stock',
    actions: 'Actions',
    build: 'Build',
  };

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for a part'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          getParts().length > 0 ?
            <ResponsiveTable rows={getParts()} cols={columns} /> :
            <span>No parts were found.</span>
        }
      </Card>
      <Button
        onClick={buildParts}
        type='primary'
        style={{ marginTop: 16, float: 'right' }}>
        Build Parts
      </Button>
      <CreatePartModal />
    </div>
  );
};

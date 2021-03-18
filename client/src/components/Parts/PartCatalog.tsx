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
            const tempOrders: PartOrderItem[] = [];
            data.forEach((part : PartEntry) => {
              tempOrders.push({ partId: part.id, stockBuilt: 0 })
              const entry = resp.data.find((p : PartStockEntry) => p.partId === part.id);
              if (entry) {
                part.quantity = entry.stock;
              } else {
                part.quantity = 0;
              }
            });
            setPartOrders(tempOrders);
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
    // eslint-disable-next-line
  }, [updated, location]);

  const updatePartStocks = (response: any) => {
    const clonesOfParts = JSON.parse(JSON.stringify(parts));
    response.data.forEach((updatedPartLocationStock: any) => {
      const matchingPart = clonesOfParts.find((clone: any) => clone.id === updatedPartLocationStock.partId._id);
      // quantity is what we display on the frontend
      matchingPart.quantity = updatedPartLocationStock.stock;
    });
    dispatch(setPartList(clonesOfParts));
  }

  const getMaterials = (part : PartEntry) => {
    const mats = materialsData.filter((m) => part.materials.find((i) => i.materialId === m.id));
    if (mats.length < 1) {
      return <i>None</i>;
    }
    return mats.map((m) => m.name).join(', ');
  };

  const getParts = () => {
    let rows = JSON.parse(JSON.stringify(parts));

    if (searchValue) {
      rows = rows.filter(
        (part : PartEntry) => part.name.toLowerCase().includes(searchValue)
      );
    }

    rows.forEach((row : any) => {
      const partOrder = partOrders.find((p) => p.partId === row.id);
      row.id = row['_id'];
      row.build = (
        <InputNumber
          placeholder='Input a quantity'
          min={0}
          style={{ width: '100%' }}
          value={partOrder ? partOrder.stockBuilt : 0}
          onChange={(v) => updateQuantity(row.id, v)} />
      );
      row.actions = <EditPartModal part={row} />;
      row.materialsString = getMaterials(row);
    });

    rows.sort((a : PartEntry, b : PartEntry) => {
      return a.name < b.name ? -1 : 1;
    });
    return rows;
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setSearchValue(value);
  };

  const updateQuantity = (id: string, val: any) => {
    const clone = JSON.parse(JSON.stringify(partOrders));
    const partOrder = clone.find((p : PartOrderItem) => p.partId === id);
    partOrder.stockBuilt = val;
    setPartOrders(clone);
  };

  const buildParts = () => {
    // checking if any parts were selected to be built
    debugger;
    const ordersToSend : PartOrderItem[] = partOrders.filter((order)=> order.stockBuilt > 0);
    if (ordersToSend.length > 0){
      axios.patch('parts/build/' + location, ordersToSend)
        .then((data) => {
          updatePartStocks(data);
          message.success('The part(s) were built successfully.');
        }).catch((err) => {
        message.error('There are not enough materials to build the part(s).');
        console.log(err);
      });
    } else {
      message.error('There are no parts to build.');
    }
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
            <ResponsiveTable values={getParts()} columns={columns} /> :
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

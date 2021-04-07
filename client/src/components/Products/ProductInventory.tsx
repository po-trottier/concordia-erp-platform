import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { ProductHistoryEntry } from '../../interfaces/ProductHistoryEntry';
import { RootState } from '../../store/Store';
import axios from '../../plugins/Axios';
import Chart from "react-apexcharts";

const { Search } = Input;

const inventoryColumns = {
  name: 'Name',
  date: 'Date',
  stockBuilt: 'Built',
  stockUsed: 'Used',
  stock: 'Stock',
};

export const ProductInventory = () => {
  const location = useSelector((state : RootState) => state.location.selected);

  const emptyData : ProductHistoryEntry[] = [];
  const [products, setProducts] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('products/logs/' + location)
      .then(async ({ data }) => {
        for (const row of data) {
          row.date = row.date.substring(0,10);
          row.name = row.productId.name + (row.isEstimate ? ' (estimate)' : '');
        }
        setProducts(data);
      });
  }, [location]);

  const getProducts = () => {
    let rows = JSON.parse(JSON.stringify(products));

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

  const getChartState = () => {
    const dashArray: number[] = [];
    const series: any[] = [];
    const colours: string[] = [];

    const rows = getProducts();
    const seriesNames: any = {};
    rows.forEach((row: any) => {
      if (! seriesNames[row.name])  {
        seriesNames[row.name] = true;
        series.push({
          name: row.name,
          data: []
        });

        if (row.isEstimate){
          dashArray.push(5);
        } else {
          dashArray.push(0);
          colours.push('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
        }

      }

      const toAddTo = series.find((item: any) => item.name === row.name);
      toAddTo.data.push({
        x: row.date,
        y: row.stock
      });
    });

    const state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          type: 'datetime',
        },
        stroke: {
          dashArray: dashArray
        },
        colors: colours,
      },
      series: series
    };
    return state;
  }

  const getTableData = () => {
    return getProducts().filter((row: any) => ! row.isCopy);
  }

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Search
          placeholder='Search for a product transaction'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          getProducts().length > 0 ?
              <Chart {...getChartState()} type="line" height={350} />
              :
            <span>No product transactions were found.</span>
        }
      </Card>
      <Card style={{ display: getProducts().length > 0 ? 'block' : 'none' }}>
        <ResponsiveTable values={getTableData()} columns={inventoryColumns} />
      </Card>
    </div>
  );
};

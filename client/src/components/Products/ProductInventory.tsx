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
//          row.date = new Date(row.date).toLocaleDateString();
//          if (row.isEstimate)
//            row.date = row.date + " (estimate)";
          row.name = row.productId.name;
        }
        setProducts(data);
      });
  }, [location]);

  const formatDate = (date: string) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
  };

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

  const getSeries = () => {
    const rows = getProducts();

    const seriesNames: any = {};
    const series: any[] = [];
    rows.forEach((row: any) => {
      if (! seriesNames[row.name])  {
        seriesNames[row.name] = true;
        series.push({
          name: row.name,
          data: []
        })
      }
      const toAddTo = series.find((item: any) => item.name === row.name);
      toAddTo.data.push({
        x: row.date,
        y: row.stock
      });
    })

    console.log(series);
    return series;
  };

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          type: 'datetime',
        },
      },
      series: getSeries()/*[
        {
          name: "series-1",
          data: [{ x: '05/06/2014', y: 54 }, { x: '05/08/2014', y: 17 } , { x: '05/28/2014', y: 26 }],
        }
      ]*/
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
              <Chart options={state.options} series={state.series} type="line" height={350} />
              :
            <span>No product transactions were found.</span>
        }
      </Card>
      <Card style={{ display: getProducts().length > 0 ? 'block' : 'none' }}>
        <ResponsiveTable values={getProducts()} columns={inventoryColumns} />
      </Card>
    </div>
  );
};

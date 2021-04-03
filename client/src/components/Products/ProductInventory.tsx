import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import { Line } from '@ant-design/charts';
import { ResponsiveTable } from '../ResponsiveTable';
import { ProductHistoryEntry } from '../../interfaces/ProductHistoryEntry';
import { RootState } from '../../store/Store';
import axios from '../../plugins/Axios';

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
          row.date = new Date(row.date).toLocaleDateString();
          row.name = row.productId.name;
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

    rows.sort((a : any, b : any) => {
      const dateA = a.date;
      const dateB = b.date;
      return dateA < dateB ? -1 : 1;
    });

    return addPredictions(rows);
  }

  const addPredictions = (rows: any) => {
    let seen: any[] = [];
    let predictionsToAdd: any[] = [];

    for (let left = 0 ; left < rows.length ; left++) {
      // already done prediction for this product, move on
      if (seen.includes(rows[left].name)) {
        continue;
      }

      // calculate the prediction
      seen.push(rows[left].name)
      for (let right = rows.length - 1; left < right ; right--) {
        if (rows[right].name === rows[left].name) {
          const firstDate = convertDate(rows[left].date);
          const lastDate = convertDate(rows[right].date);
          const endOfYear = new Date(new Date().getFullYear(), 11, 31);
          const daysBetween = calculateDiffInDays(firstDate, lastDate);
          const daysTillEnd = calculateDiffInDays(lastDate, endOfYear);

          const predictedStockMultiplier = (rows[right].stock - rows[left].stock) / daysBetween;
          const predictedStock = predictedStockMultiplier * daysTillEnd;
          const stockDifference = predictedStock - rows[right].stock;

          let predictionRow = {
            name: rows[right].name,
            date: endOfYear.toLocaleString().split(',')[0],
            stockBuilt: stockDifference > 0 ? stockDifference : 0,
            stockUsed: stockDifference < 0 ? -stockDifference : 0,
            stock: predictedStock,
          };

          predictionsToAdd.push(predictionRow);
          break;
        }
      }
    }

    return [...rows, ...predictionsToAdd];
  }

  // Retarded utility functions
  const convertDate = (dateString: any) => {
    const dateParts = dateString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  }

  const calculateDiffInDays = (dateA: Date, dateB: Date) => {
      const differenceInTime = dateA.getTime() - dateB.getTime();
      const differenceInDays = Math.round(differenceInTime /(1000 * 3600 * 24));
      return Math.abs(differenceInDays);
  }

  // end of retarded utility functions

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
            <Line
              data={getProducts()}
              xField='date'
              yField='stock'
              seriesField='name' /> :
            <span>No product transactions were found.</span>
        }
      </Card>
      <Card style={{ display: getProducts().length > 0 ? 'block' : 'none' }}>
        <ResponsiveTable values={getProducts()} columns={inventoryColumns} />
      </Card>
    </div>
  );
};

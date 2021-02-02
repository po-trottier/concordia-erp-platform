import React from 'react';
import {Card, Typography} from 'antd';
import {Line} from '@ant-design/charts';

import {ResponsiveTable} from '../ResponsiveTable';
import {MaterialsTimelineEntry} from '../../interfaces/MaterialsTimelineEntry';

const { Title } = Typography;

export const MaterialsTimeline = () => {
  const getColumns = () => ({
    material: 'material',
    date: 'Date',
    bought: 'bought',
    used: 'used',
    stock: 'stock'
  });

  const getRows = () => {
    const rows: MaterialsTimelineEntry[] = [
      {
        material: "Metal",
        date : (new Date("2021-01-30")).toLocaleDateString(),
        bought: 7000,
        used: 6600,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-30")).toLocaleDateString(),
        bought : 7000,
        used : 6600,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-29")).toLocaleDateString(),
        bought : 7300,
        used : 7300,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-29")).toLocaleDateString(),
        bought : 8000,
        used : 7500,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-28")).toLocaleDateString(),
        bought : 9000,
        used : 8100,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-28")).toLocaleDateString(),
        bought : 8340,
        used : 7340,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-27")).toLocaleDateString(),
        bought : 8250,
        used : 7100,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-27")).toLocaleDateString(),
        bought : 900,
        used : 333,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-26")).toLocaleDateString(),
        bought : 8520,
        used : 7940,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-26")).toLocaleDateString(),
        bought : 800,
        used : 150,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-25")).toLocaleDateString(),
        bought : 8210,
        used : 7115,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-25")).toLocaleDateString(),
        bought : 800,
        used : 100,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-24")).toLocaleDateString(),
        bought : 7750,
        used : 7100,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-24")).toLocaleDateString(),
        bought : 800,
        used : 200,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-23")).toLocaleDateString(),
        bought : 8150,
        used : 7540,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-23")).toLocaleDateString(),
        bought : 800,
        used : 300,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-22")).toLocaleDateString(),
        bought : 8450,
        used : 7320,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-22")).toLocaleDateString(),
        bought : 8000,
        used : 7800,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-21")).toLocaleDateString(),
        bought : 8050,
        used : 7320,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-21")).toLocaleDateString(),
        bought : 6300,
        used : 5300,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-20")).toLocaleDateString(),
        bought : 8270,
        used : 7140,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-20")).toLocaleDateString(),
        bought : 7500,
        used : 6700,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-19")).toLocaleDateString(),
        bought : 7880,
        used : 6840,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-19")).toLocaleDateString(),
        bought : 7500,
        used : 6300,
      },
      {
        material: "Metal",
        date : (new Date("2021-01-18")).toLocaleDateString(),
        bought : 7050,
        used : 6700,
      },
      {
        material: "Plastic",
        date : (new Date("2021-01-18")).toLocaleDateString(),
        bought : 8000,
        used : 6700,
      },
    ];
    rows.forEach((row : MaterialsTimelineEntry) => {
      row.stock  = row.bought - row.used;
    });
    return rows;
  }

  return (
    <div>
      <Card style={{ marginTop: '24px' }}>
        <Title level={4} style={{ marginBottom: '24px' }}>
          Stock Logs
        </Title>
        <Line
          data={getRows()}
          xField="date"
          yField="stock"
          seriesField="material"
          style={{ marginBottom: '48px' }}/>
        <ResponsiveTable rows={getRows()} cols={getColumns()} />
      </Card>
    </div>
  );
}
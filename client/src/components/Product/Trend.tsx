import React from 'react';
import { Line } from '@ant-design/charts';
import { Card } from 'antd';

const data = [
    {
      date : (new Date("2021-01-20")).toLocaleDateString(),
      numberSold: 5,
    },
    {
      date : (new Date("2021-01-21")).toLocaleDateString(),
      numberSold: 4,
    },
    {
      date : (new Date("2021-01-22")).toLocaleDateString(),
      numberSold: 7,
    },
    {
      date : (new Date("2021-01-23")).toLocaleDateString(),
      numberSold: 9,
    },
    {
      date : (new Date("2021-01-24")).toLocaleDateString(),
      numberSold: 7,
    },
    {
      date : (new Date("2021-01-25")).toLocaleDateString(),
      numberSold: 12,
    },
    {
      date : (new Date("2021-01-26")).toLocaleDateString(),
      numberSold: 8,
    },
    {
      date : (new Date("2021-01-27")).toLocaleDateString(),
      numberSold: 11,
    },
    {
      date : (new Date("2021-01-28")).toLocaleDateString(),
      numberSold: 12,
    },
    {
      date : (new Date("2021-01-29")).toLocaleDateString(),
      numberSold: 13,
    },
    {
      date : (new Date("2021-01-30")).toLocaleDateString(),
      numberSold: 13,
    },
    {
      date : (new Date("2021-01-19")).toLocaleDateString(),
      numberSold: 10,
    },
    {
      date : (new Date("2021-01-18")).toLocaleDateString(),
      numberSold: 10,
    },
  ];

  const trend = () => {
      return (
        <Card style={{ margin: '24px 0' }}>
          <Line data={data} xField="date" yField="numberSold"/>
        </Card>
      );
  }

  export default trend;
export const getChartState = (rows: any[]) => {
  const dashArray: number[] = [];
  const series: any[] = [];
  const colours: string[] = [];

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

    series.find((item: any) => item.name === row.name).data.push({
      x: row.date,
      y: row.stock
    });
  });

  return {
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
}

export const getTableData = (rows: any[]) => {
  return rows.filter((row: any) => ! row.isCopy);
}

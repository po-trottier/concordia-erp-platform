import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState : { chartState : any } = {
  chartState: {
    options: {
      chart: { id: 'basic-bar' },
      xaxis: { type: 'datetime' },
      stroke: { dashArray: [] },
      colors: [],
    },
    series: [],
  }
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    getChartState: (state, { payload } : PayloadAction<any>) => {
      const rows = payload;

      const dashArray : number[] = [];
      const series : any[] = [];
      const colours : string[] = [];

      const seriesNames : any = {};
      rows.forEach((row : any) => {
        if (!seriesNames[row.name]) {
          // create series if it doesn't exist
          const newSeries = {
            name: row.name,
            data: []
          };
          seriesNames[row.name] = true;

          if (row.isEstimate) {
            for (let i = 0; i < series.length; i++) {
              if (series[i].name === row.name.substring(0, row.name.length - 11)) {
                series.splice(i + 1, 0, newSeries);
                dashArray.splice(i + 1, 0, 5);
                colours.splice(i + 1, 0, colours[i]);
                break;
              }
            }
          } else {
            series.push(newSeries);
            dashArray.push(0);
            colours.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
          }
        }

        // add x-y pair to series
        series.find((item : any) => item.name === row.name).data.push({
          x: row.date,
          y: row.stock
        });
      });

      state.chartState = {
        options: {
          chart: { id: 'basic-bar' },
          xaxis: { type: 'datetime' },
          stroke: { dashArray: dashArray },
          colors: colours,
        },
        series: series
      };
    },
  }
});

export const {
  getChartState
} = chartSlice.actions;

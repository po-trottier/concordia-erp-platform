import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import seedrandom from 'seedrandom';

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
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!seriesNames[row._id + row.name]) {
          // create series if it doesn't exist
          const newSeries = {
            name: row.name,
            data: []
          };
          seriesNames[row._id + row.name] = true;

          if (row.isEstimate) {
            for (let j = 0; j < series.length; j++) {
              if (series[j].name === row.name.substring(0, row.name.length - 11)) {
                series.splice(j + 1, 0, newSeries);
                dashArray.splice(j + 1, 0, 5);
                colours.splice(j + 1, 0, colours[j]);
                break;
              }
            }
          } else {
            // Using seedrandom so we have a predictable seed to use
            colours.push('#' + (seedrandom('x' + i)() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
            series.push(newSeries);
            dashArray.push(0);
          }
        }

        // add x-y pair to series
        series.find((item : any) => item.name === row.name).data.push({
          x: row.date,
          y: row.stock
        });
      }

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

import { differenceInCalendarDays } from 'date-fns';

export const addPredictions = (rows: any, id: string) => {
  const predictions: any[] = [];
  let buffer: any[] = [];

  for (const row of rows) {
    if (buffer.length < 1) {
      buffer.push(row);
    } else if (buffer[buffer.length - 1][id] === row[id]) {
      buffer.push(row);
    } else {
      buildPredictions(predictions, buffer);
      buffer = [row];
    }
  }
  buildPredictions(predictions, buffer);

  return [...rows, ...predictions];
};

const buildPredictions = (predictions, buffer) => {
  if (buffer.length > 1) {
    predictions.push(getCopy(buffer[buffer.length - 1]));
    predictions.push(getPredictionValue(buffer[0], buffer[buffer.length - 1]));
  }
};

const getPredictionValue = (start, end) => {
  // aCalculate predicted stock;
  const firstDate = new Date(start.date);
  const lastDate = new Date(end.date);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31);

  const daysBetween = Math.abs(differenceInCalendarDays(firstDate, lastDate));
  const daysTillEnd = Math.abs(differenceInCalendarDays(lastDate, endOfYear));

  const multiplier = (end.stock - start.stock) / daysBetween;
  const predictedStock = end.stock + multiplier * daysTillEnd;

  // Create prediction row
  const prediction = JSON.parse(JSON.stringify(end));
  prediction.date = endOfYear;
  prediction.stockBuilt = 'N/A';
  prediction.stockUsed = 'N/A';
  prediction.stock = predictedStock;
  prediction.isEstimate = true;

  return prediction;
};

const getCopy = (row) => {
  const copy = JSON.parse(JSON.stringify(row));
  copy.isEstimate = true;
  copy.isCopy = true;
  return copy;
};

export const addPredictions = (rows: any, id: string) => {
  const predictions: any[] = [];
  let buffer: any[] = [];

  for (const row of rows) {
    if (buffer.length < 1) {
      buffer.push(row);
    } else if (buffer[buffer.length - 1][id] === row[id]) {
      buffer.push(row);
    } else {
      if (buffer.length > 1) {
        predictions.push(getCopy(buffer[buffer.length - 1]));
        predictions.push(getPredictionValue(buffer[0], buffer[buffer.length - 1]));
      }
      buffer = [row];
    }
  }
  if (buffer.length > 1){
      predictions.push(getCopy(buffer[buffer.length - 1]));
      predictions.push(getPredictionValue(buffer[0], buffer[buffer.length - 1]));
  }

  console.log(buffer);
  console.log(predictions);
  return [...rows, ...predictions];
};

const getPredictionValue = (start, end) => {
  // actual logic to calculate predictedStock;
  const firstDate = new Date(start.date);
  const lastDate = new Date(end.date);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31);
  const daysBetween = calculateDiffInDays(firstDate, lastDate);
  const daysTillEnd = calculateDiffInDays(lastDate, endOfYear);
  const predictedStockMultiplier = (end.stock - start.stock) / daysBetween;
  const predictedStock = predictedStockMultiplier * daysTillEnd;

  // creating prediction row
  const prediction = JSON.parse(JSON.stringify(end));
  prediction.date = endOfYear.toLocaleString().split(',')[0];
  prediction.stockBuilt = 0;
  prediction.stockUsed = 0;
  prediction.stock = predictedStock;
  prediction.isEstimate = true;

  return prediction;
};

const getCopy = (row) => {
  const copy = JSON.parse(JSON.stringify(row));
  copy.isEstimate = true;
  copy.isCopy = true;

  return copy
}

const calculateDiffInDays = (dateA: Date, dateB: Date) => {
  const differenceInTime = dateA.getTime() - dateB.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return Math.abs(differenceInDays);
};

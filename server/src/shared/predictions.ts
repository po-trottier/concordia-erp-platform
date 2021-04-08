export const addPredictions = (rows: any, id: string) => {
  const predictions: any[] = [];
  let buffer: any[] = [];

  for (const row of rows) {
    if (buffer.length < 1) {
      buffer.push(row);
    } else if (buffer[buffer.length - 1][id] === row[id]) {
      buffer.push(row);
    } else {
      predictions.push(getCopy(buffer[buffer.length - 1], id));
      predictions.push(getPredictionValue(buffer[0], buffer[buffer.length - 1], id));
      buffer = [row];
    }
  }

  console.log(predictions);
  return [...rows, ...predictions];
};

const getPredictionValue = (start, end, id) => {
  // actual logic to calculate predictedStock;
  const firstDate = new Date(start.date);
  const lastDate = new Date(end.date);
  const endOfYear = new Date(new Date().getFullYear(), 11, 31);
  const daysBetween = calculateDiffInDays(firstDate, lastDate);
  const daysTillEnd = calculateDiffInDays(lastDate, endOfYear);
  const predictedStockMultiplier =
    (end.stock - start.stock) / daysBetween;
  const predictedStock = predictedStockMultiplier * daysTillEnd;
  const stockDifference = predictedStock - end.stock;

  // creating prediction row
  const prediction = {
    _id: end._id,
    date: endOfYear.toLocaleString().split(',')[0],
    locationId: end.locationId,
    stockBuilt: stockDifference > 0 ? stockDifference : 0,
    stockUsed: stockDifference < 0 ? -stockDifference : 0,
    stock: predictedStock,
    isEstimate: true,
  };
  prediction[id] = end[id];
  if (id === 'materialId')
    prediction['stockBought'] = prediction.stockBuilt;
  return prediction;

};

const getCopy = (row, id) => {
  const copy = {
    _id: row._id,
    date: row.date,
    locationId: row.locationId,
    stockBuilt: row.stockBuilt,
    stockUsed: row.stockUsed,
    stock: row.stock,
    isEstimate: true,
    isCopy: true
  }
  copy[id] = row[id];

  return copy
}

const calculateDiffInDays = (dateA: Date, dateB: Date) => {
  const differenceInTime = dateA.getTime() - dateB.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return Math.abs(differenceInDays);
};

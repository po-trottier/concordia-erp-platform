export const addPredictions = (rows: any, IdKey: string) => {
  const seen: any[] = [];
  const predictionsToAdd: any[] = [];

  for (let left = 0; left < rows.length; left++) {
    // already done prediction for this product, move on
    if (seen.includes(rows[left][IdKey])) {
      continue;
    }

    // calculate the prediction
    seen.push(rows[left][IdKey]);
    for (let right = rows.length - 1; left < right; right--) {
      if (rows[right][IdKey] === rows[left][IdKey]) {
        const firstDate = new Date(rows[left].date);
        const lastDate = new Date(rows[right].date);
        const endOfYear = new Date(new Date().getFullYear(), 11, 31);
        const daysBetween = calculateDiffInDays(firstDate, lastDate);
        const daysTillEnd = calculateDiffInDays(lastDate, endOfYear);

        const predictedStockMultiplier =
          (rows[right].stock - rows[left].stock) / daysBetween;
        const predictedStock = predictedStockMultiplier * daysTillEnd;
        const stockDifference = predictedStock - rows[right].stock;

        const predictionRow = {
          _id: rows[right]._id,
          date: endOfYear.toLocaleString().split(',')[0],
          locationId: rows[right].locationId,
          stockBuilt: stockDifference > 0 ? stockDifference : 0,
          stockUsed: stockDifference < 0 ? -stockDifference : 0,
          stock: predictedStock,
          isEstimate: true,
        };
        predictionRow[IdKey] = rows[right][IdKey];

        predictionsToAdd.push(predictionRow);
        break;
      }
    }
  }

  return [...rows, ...predictionsToAdd];
};

const calculateDiffInDays = (dateA: Date, dateB: Date) => {
  const differenceInTime = dateA.getTime() - dateB.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return Math.abs(differenceInDays);
};

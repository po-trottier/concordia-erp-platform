export const addPredictions = (rows: any) => {
  const seen: any[] = [];
  const predictionsToAdd: any[] = [];

  for (let left = 0; left < rows.length; left++) {
    // already done prediction for this product, move on
    if (seen.includes(rows[left].productId)) {
      continue;
    }

    // calculate the prediction
    seen.push(rows[left].productId);
    for (let right = rows.length - 1; left < right; right--) {
      if (rows[right].productId === rows[left].productId) {
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
          productId: rows[right].productId,
          stockBuilt: stockDifference > 0 ? stockDifference : 0,
          stockUsed: stockDifference < 0 ? -stockDifference : 0,
          stock: predictedStock,
          isEstimate: true,
        };

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

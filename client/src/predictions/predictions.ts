export const addPredictions = (rows: any) => {
  let seen: any[] = [];
  let predictionsToAdd: any[] = [];

  for (let left = 0 ; left < rows.length ; left++) {
    // already done prediction for this product, move on
    if (seen.includes(rows[left].name)) {
      continue;
    }

    // calculate the prediction
    seen.push(rows[left].name)
    for (let right = rows.length - 1; left < right ; right--) {
      if (rows[right].name === rows[left].name) {
        const firstDate = convertDate(rows[left].date);
        const lastDate = convertDate(rows[right].date);
        const endOfYear = new Date(new Date().getFullYear(), 11, 31);
        const daysBetween = calculateDiffInDays(firstDate, lastDate);
        const daysTillEnd = calculateDiffInDays(lastDate, endOfYear);

        const predictedStockMultiplier = (rows[right].stock - rows[left].stock) / daysBetween;
        const predictedStock = predictedStockMultiplier * daysTillEnd;
        const stockDifference = predictedStock - rows[right].stock;

        let predictionRow = {
          name: rows[right].name,
          date: endOfYear.toLocaleString().split(',')[0] + " (estimate)",
          stockBuilt: stockDifference > 0 ? stockDifference : 0,
          stockUsed: stockDifference < 0 ? -stockDifference : 0,
          stock: predictedStock,
        };

        predictionsToAdd.push(predictionRow);
        break;
      }
    }
  }

  return [...rows, ...predictionsToAdd];
}

const convertDate = (dateString: any) => {
  const dateParts = dateString.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

const calculateDiffInDays = (dateA: Date, dateB: Date) => {
    const differenceInTime = dateA.getTime() - dateB.getTime();
    const differenceInDays = Math.round(differenceInTime /(1000 * 3600 * 24));
    return Math.abs(differenceInDays);
}

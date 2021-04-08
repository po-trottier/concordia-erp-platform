export const addPredictions = (rows: any, id: string) => {
  const predictions: any[] = [];
  const buffer: any[] = [];

  for (const row of rows) {
    if (buffer.length < 1) {
      buffer.push(row);
    } else if (buffer[buffer.length - 1][id] === row[id]) {
      buffer.push(row);
    } else {
      predictions.push(
        getPredictionValue(buffer[0], buffer[buffer.length - 1]),
      );
    }
  }

  return [...rows, ...predictions];
};

const getPredictionValue = (start, end) => {
  const prediction = end;

  // TODO Calculate the prediction and change date to End of Year

  return prediction;
};

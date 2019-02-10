export async function makePromiseBatch<T>(
  promises: Promise<T>[],
  batchSize: number
): Promise<T[][]> {
  const promiseBatches = chunk(promises, batchSize);

  const results: T[][] = [];
  for (const batch of promiseBatches) {
    const result = await Promise.all(batch);
    results.push(result);
  }
  return results;
}

function chunk<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
  return arr.reduce(
    (prevVal: any, currVal: any, currIndx: number, array: Array<T>) =>
      !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal,
    []
  );
}

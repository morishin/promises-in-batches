export async function makePromiseBatch<T>(promiseGenerators: (() => Promise<T>)[], batchSize: number): Promise<T[][]> {
  const chunkedPromiseGenerators = chunk(promiseGenerators, batchSize);
  var results = [];
  for (const generators of chunkedPromiseGenerators) {
    const result = await Promise.all(generators.map(g => g()));
    results.push(result);
  }
  return results;
}

function chunk<T>(array: T[], chunkSize: number): T[][] {
  return [...Array(Math.floor(array.length / chunkSize)).keys()]
    .map(v => v * chunkSize)
    .map(v => array.slice(v, v + chunkSize))
    .concat([array.slice(array.length - (array.length % chunkSize), array.length)])
    .filter(a => a.length > 0);
}

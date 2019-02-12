import { makePromiseBatch } from './PromisesInBatches';

test('The return value is grouped by batches', async () => {
  const batchSize = 3;
  const promiseGenerators = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => () => Promise.resolve(i));
  const results = await makePromiseBatch(promiseGenerators, batchSize);
  expect(results).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
});

test('The number of parallel executions of promises is not greater than batch size', async () => {
  class Counter {
    count: number = 0;
    record: number[] = [0];

    countUp() {
      this.count += 1;
      this.record.push(this.count);
    }

    countDown() {
      this.count -= 1;
      this.record.push(this.count);
    }
  }

  var parallelExecutionsCounter = new Counter();

  const batchSize = 3;
  const promiseGenerators = [...Array(10).keys()].map(i => () =>
    new Promise<number>((resolve, _) => {
      parallelExecutionsCounter.countUp();
      setTimeout(() => {
        parallelExecutionsCounter.countDown();
        resolve(i);
      }, Math.random() * 10);
    }),
  );
  await makePromiseBatch(promiseGenerators, batchSize);
  expect(parallelExecutionsCounter.record.every(n => n <= batchSize)).toBe(true);
});

import { makePromiseBatch } from "./promises-in-batches";

test("it runs promises as a batch", async () => {
  const batchSize = 3;
  const group1 = new Array(batchSize).fill(1).map(i => Promise.resolve(i));
  const group2 = new Array(batchSize).fill(2).map(i => Promise.resolve(i));
  const group3 = new Array(batchSize).fill(3).map(i => Promise.resolve(i));
  const promises = group1.concat(group2, group3);
  const results = await makePromiseBatch(promises, batchSize);
  expect(results).toEqual([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
});

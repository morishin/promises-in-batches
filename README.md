[![CircleCI](https://circleci.com/gh/morishin/promises-in-batches.svg?style=svg)](https://circleci.com/gh/morishin/promises-in-batches)

# promises-in-batches

Execute promises sequentially in batches.

You can executes promises concurrently with a limitation of concurrency.

e.g.) Batch Size: 3

![promises-in-batches](https://user-images.githubusercontent.com/1413408/52653624-a7689f80-2f33-11e9-91cf-4064f9a3974b.png)

## Installation

```shell
yarn add promises-in-batches
```

or

```shell
npm install --save-dev promises-in-batches
```

## Usage

```typescript
import { makePromiseBatch } from "promises-in-batches";

const promiseGenerator1: () => Promise<number> = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(1);
    }, 100);
  });

const promiseGenerator2: () => Promise<number> = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(2);
    }, 300);
  });

const promiseGenerator3: () => Promise<number> = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(3);
    }, 200);
  });

const batchSize = 2;
const results = await makePromiseBatch(
  [promiseGenerator1, promiseGenerator2, promiseGenerator3],
  batchSize
);

console.log(results); // [ [ 1, 2 ], [ 3 ] ]
```
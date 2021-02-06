
/* Copyright 2018 Kevin Zatloual. All rights reserved. */

import { KMeans, Closest, Dist } from './KMeans';
import Table from '../shared/Table';


const cols = [
    {name: 'X', precision: 0, missing: 0, distinct: 10},
    {name: 'Y', precision: 0, missing: 0, distinct: 10}
  ];


it('KMeans with n=k=3', () => {
  const pts = [[0, 0], [0, 1], [1, 0]];

  let [centers, scales, fit] = KMeans(new Table('Foo', cols, pts, 2, 3), 3);
  expect(centers.length).toBe(3);
  expect(scales.length).toBe(2);

  const index0 = Closest(pts[0], centers, scales);
  const index1 = Closest(pts[1], centers, scales);
  const index2 = Closest(pts[2], centers, scales);

  expect(Dist(pts[0], centers[index0], scales)).toBeCloseTo(0, 5);
  expect(Dist(pts[1], centers[index1], scales)).toBeCloseTo(0, 5);
  expect(Dist(pts[2], centers[index2], scales)).toBeCloseTo(0, 5);
});


it('KMeans with n=12 k=3', () => {
  const pts = [
      [0, 0], [0, 0.1], [0.1, 0], [0.1, 0.1],
      [0, 10], [0, 10.1], [0.1, 10], [0.1, 10.1],
      [10, 0], [10, 0.1], [10.1, 0], [10.1, 0.1]];

  let [centers, scales, fit] = KMeans(new Table('Foo', cols, pts, 2, 12), 3);
  expect(centers.length).toBe(3);
  expect(scales.length).toBe(2);

  const index0 = Closest([0.05, 0.05], centers, scales);
  const index1 = Closest([0.05, 10.05], centers, scales);
  const index2 = Closest([10.05, 0.05], centers, scales);

  expect(Dist([0.05, 0.05], centers[index0], scales)).toBeCloseTo(0, 5);
  expect(Dist([0.05, 10.05], centers[index1], scales)).toBeCloseTo(0, 5);
  expect(Dist([10.05, 0.05], centers[index2], scales)).toBeCloseTo(0, 5);
});
/* Copyright 2018 Kevin Zatloual. All rights reserved. */

import Matrix from '../matrix/Matrix';
import { Mean, StdDev } from '../util/SampleStat';
import { InitRandomSeed, Random, RandomPermute } from '../util/RandomUtil';


/**
 * Invokes KMeans for each size of clusters from 1-10 and returns all of the
 * centers, scales, and fits in a list.
 */
export function KMeansWrapper(table, onProgress) {
  let allCenters = [], allScales = [], allFits = [];
  for (let k = 1; k <= 10; k++) {
    let [centers, scales, fit] = KMeans(table, k);
    allCenters.push(centers);
    allScales.push(scales);
    allFits.push(fit);

    onProgress(5 + 10 * (k-1));
  }

  return [allCenters, allScales, allFits];
}

/**
 * Returns the list (centers, scales), where centers contains the k centers and
 * scales contain the scaling applied to the columns before measuring distance.
 * onProgress, if provided, will be called after each iteration, with the
 * percent of iterations completed.
 */
export function KMeans(table, k) {
  // Compute the means and stddevs of each column of the table.
  let M = new Matrix(table.rows);
  let scales = [];
  for (let j = 0; j < table.ncols; j++) {
    scales.push(StdDev(M.getColumn(j)));
  }

  InitRandomSeed(5678);          // Make this repeatable
  Random(); Random(); Random();  // Fill all the bits.

  // Choose random starting centers.
  let indexes = table.rows.map((val, index) => index);
  RandomPermute(indexes);
  let centers = indexes.slice(0, k).map((i) => table.rows[i]);

  // Initially assign every row to the first cluster.
  let clusters = table.rows.map((val) => 0);

  // Update the centers until convergence (or 100 iterations).
  // We skip the first 5 since progress starts there.
  for (let t = 6; t < 100; t++) {
    // Assign each row to the closest cluster.
    let changed = false;
    for (let i = 0; i < table.nrows; i++) {
      let index = Closest(table.rows[i], centers, scales);
      if (index !== clusters[i]) {
        clusters[i] = index;
        changed = true;
      }
    }

    // If there were no changes, we're done
    if (!changed)
      break;

    // Compute new cluster centers.
    let counts = centers.map((v) => 0);
    centers = centers.map((row) => row.map((val) => 0));
    for (let i = 0; i < table.nrows; i++) {
      counts[clusters[i]] += 1;
      for (let j = 0; j < table.ncols; j++)
        centers[clusters[i]][j] += table.rows[i][j];
    }
    for (let i = 0 ; i < k; i++) {
      for (let j = 0; j < table.ncols; j++)
        centers[i][j] /= counts[i];
    }
  }

  let dists = [];
  for (let i = 0; i < table.nrows; i++)
    dists.push(Dist(table.rows[i], centers[clusters[i]], scales));

  return [centers, scales, Mean(dists)];
}


/**
 * Returns the index of the closest row to the given one, after applying the
 * scaling in scales.
 */
export function Closest(row, rows, scales) {
  let min_dist = Dist2(row, rows[0], scales);
  let min_index = 0;

  for (let i = 1; i < rows.length; i++) {
    const dist = Dist2(row, rows[i], scales);
    if (dist < min_dist) {
      min_dist = dist;
      min_index = i;
    }
  }

  return min_index;
}


// Returns the squared Euclidian distance between the two given rows after the
// columns are scaled by s.
function Dist2(row1, row2, scales) {
  let s = 0;
  for (let j = 0; j < row1.length; j++) {
    const t = (row1[j] - row2[j]) / scales[j];
    s += t * t;
  }
  return s;
} 


// Returns the Euclidian distance between the two given rows after the
// columns are scaled by s.
export function Dist(row1, row2, scales) {
  return Math.sqrt(Dist2(row1, row2, scales));
}
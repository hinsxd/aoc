function getPossibilities(time, distance) {
  const [a, b, c] = [-1, time, -distance];

  const axis = -b / (2 * a);

  // Quadratic formula = -b/2a +- sqrt(b^2 - 4ac) / 2a
  //                      &

  const dx = Math.abs(Math.sqrt(b ** 2 - 4 * a * c) / (2 * a));
  const min = Math.floor(axis - dx + 1);
  const max = Math.ceil(axis + dx - 1);
  return max - min + 1;
}
/**
 *
 * @param {string} input
 * @returns
 */
export function part1(input) {
  const lines = input.split("\n");

  const times = lines[0].match(/\d+/g).map(Number);
  const distances = lines[1].match(/\d+/g).map(Number);
  const zipped = times.map((time, i) => [time, distances[i]]);

  let result = 1;

  for (const [time, distance] of zipped) {
    const ways = getPossibilities(time, distance);
    if (ways > 0) result *= ways;
  }

  return result;
}

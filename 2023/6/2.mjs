function getPossibilities(time, distance) {
  const [a, b, c] = [-1, time, -distance];

  const axis = -b / (2 * a);
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
export function part2(input) {
  const lines = input.split("\n");

  const times = lines[0].match(/\d+/g).map(Number);
  const distances = lines[1].match(/\d+/g).map(Number);

  return getPossibilities(
    parseInt(times.join("")),
    parseInt(distances.join(""))
  );
}

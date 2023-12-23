/**
 *
 * @param {string} input
 * @returns
 */
export function part1(input) {
  const lines = input.split("\n");

  const mappings = [];
  let seeds = [];
  let min = Infinity;

  for (const line of lines) {
    if (line === "") {
      continue;
    }
    if (line.startsWith("seeds")) {
      const ss = line
        .split(" ")
        .slice(1)
        .map((seed) => parseInt(seed));
      seeds = ss;
      break;
    }
  }
  for (const [index, line] of Object.entries(lines)) {
    if (line === "") {
      continue;
    }
    if (line.startsWith("seeds")) {
      continue;
    }

    if (line.includes("map:")) {
      mappings.push([]);
      console.log(line);
      continue;
    }

    const [dest, source, range] = line.split(" ").map((item) => parseInt(item));
    mappings[mappings.length - 1].push([dest, source, range]);
  }

  for (const seed of seeds) {
    console.log("seed", seed);
    let curr = seed;
    console.log(mappings.length);
    for (const map of mappings) {
      // console.log(curr)
      inner: for (const [dest, source, range] of map) {
        const inRange = source <= curr && curr < source + range;
        if (inRange) {
          curr = dest + (curr - source);
          break inner;
        }
      }
    }

    min = Math.min(min, curr);
  }
  return min;
}

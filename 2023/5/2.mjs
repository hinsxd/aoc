/**
 *
 * @param {string} input
 * @returns
 */
export function part2(input) {
  const lines = input.split("\n");

  const mappings = [];
  let seeds = [];
  // let min = Infinity;
  for (const line of lines) {
    console.log(line);
    if (line === "") {
      continue;
    }
    if (line.startsWith("seeds")) {
      seeds = line
        .split(" ")
        .slice(1)
        .map((seed) => parseInt(seed));

      continue;
    }

    if (line.includes("map:")) {
      mappings.push([]);
      continue;
    }

    const [dest, source, range] = line.split(" ").map((item) => parseInt(item));

    mappings[mappings.length - 1].push([dest, source, range]);
  }

  // while (seeds.length) {
  //   const start = seeds.shift();
  //   const range = seeds.shift();
  //   for (let seed = start; seed < start + range; seed++) {
  //     // console.log("seed", seed);
  //     let curr = seed;

  //     for (const map of mappings) {
  //       for (const [dest, source, range] of map) {
  //         const inRange = source <= curr && curr < source + range;
  //         if (inRange) {
  //           console.log(curr, dest + (curr - source));
  //           curr = dest + (curr - source);
  //           break;
  //         }
  //       }
  //     }

  //     min = Math.min(min, curr);
  //   }
  // }
  // return min
  const reverse = [...mappings].reverse();
  for (let target = 0; ; target++) {
    let curr = target;
    for (const map of reverse) {
      for (const [dest, source, range] of map) {
        const inRange = dest <= curr && curr < dest + range;
        if (inRange) {
          curr = source + (curr - dest);
          break;
        }
      }
    }

    for (let seed = 0; seed < seeds.length; seed += 2) {
      const start = seeds[seed];
      const range = seeds[seed + 1];
      if (start <= curr && curr < start + range) {
        return target;
      }
    }

    continue;
  }
}

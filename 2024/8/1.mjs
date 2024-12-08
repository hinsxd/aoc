import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");

  const antinodes = new ObjectSet(([r, c]) => `r:${r} c:${c}`);

  const ants = new DefaultDict(
    () => new ObjectSet(([r, c]) => `r:${r} c:${c}`)
  );

  function inRange(r, c) {
    return 0 <= r && r < lines.length && 0 <= c && c < lines[0].length;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c !== ".") {
        ants.get(c).add([i, j]);
      }
    }
  }
  for (const stationSet of ants.values()) {
    const stations = [...stationSet.values()];
    for (let i = 0; i < stations.length - 1; i++) {
      const a = stations[i];
      for (let j = i + 1; j < stations.length; j++) {
        const b = stations[j];
        const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
        const [x1, y1] = [a[0] - dx, a[1] - dy];
        const [x2, y2] = [b[0] + dx, b[1] + dy];
        console.log('a left',x1,y1)
        console.log('b right',x2,y2)
        if (inRange(x1, y1)) {
          antinodes.add([x1, y1]);
        }
        if (inRange(x2, y2)) {
          antinodes.add([x2, y2]);
        }
      }
    }
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  console.log(antinodes)
  return antinodes.size;
}

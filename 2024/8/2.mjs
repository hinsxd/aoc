import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n").map((line) => line.split(""));

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
        antinodes.add([i, j]); // radio station must me antinodes
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

        let da = 1;
        while (true) {
          const [x1, y1] = [a[0] - da * dx, a[1] - da * dy];
          if (inRange(x1, y1)) {
            antinodes.add([x1, y1]);
            da++;
          } else {
            break;
          }
        }
        let db = 1;
        while (true) {
          const [x2, y2] = [b[0] + db * dx, b[1] + db * dy];
          if (inRange(x2, y2)) {
            antinodes.add([x2, y2]);
            db++;
          } else {
            break;
          }
        }
      }
    }
  }

  for (const [x, y] of antinodes.values()) {
    lines[x][y] = "#";
  }
  console.log(lines.map((line) => line.join("")).join("\n"));
  return antinodes.size;
}

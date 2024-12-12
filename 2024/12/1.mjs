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

  let sum = 0;
  const seen = new ObjectSet(([r, c]) => `r:${r},c:${c}`);

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[r].length; c++) {
      if (seen.has([r, c])) {
        continue;
      }
      seen.add([r, c]);
      // start flooding
      const char = lines[r][c];
      console.log("start", char);
      const queue = [[r, c]];
      const seen2 = new ObjectSet(([r, c]) => `r:${r},c:${c}`);
      let fences = 0;

      while (queue.length) {
        const [cr, cc] = queue.shift();
        if (seen.has([cr, cc]) && seen2.has([cr, cc])) {
          continue
        }
        seen.add([cr, cc]);
        seen2.add([cr, cc]);
        for (const [dr, dc] of dirs) {
          if (lines[cr + dr]?.[cc + dc] !== char) {
            fences++;
          }
          if (lines[cr + dr]?.[cc + dc] === char) {
            queue.push([cr + dr, cc + dc]);
          }
        }
      }

      sum += fences * seen2.size;
    }
  }

  return sum;
}

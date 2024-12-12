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
      const fences = new ObjectSet(([r, c, dr, dc]) =>
        [r, c, dr, dc].join(",")
      );

      while (queue.length) {
        const [cr, cc] = queue.shift();
        if (seen.has([cr, cc]) && seen2.has([cr, cc])) {
          continue;
        }
        seen.add([cr, cc]);
        seen2.add([cr, cc]);
        for (const [dr, dc] of dirs) {
          if (lines[cr + dr]?.[cc + dc] !== char) {
            fences.add([cr, cc, dr, dc]);
          }
          if (lines[cr + dr]?.[cc + dc] === char) {
            queue.push([cr + dr, cc + dc]);
          }
        }
      }

      let fenceCount = 0;
      const allFences = [...fences.values()];
      const fencesByDir = new DefaultDict(() => []);
      allFences.forEach(([r, c, dr, dc]) => {
        fencesByDir.set(
          [dr, dc].join(","),
          fencesByDir.get([dr, dc].join(",")).concat([[r, c]])
        );
      });

      for (const f of fencesByDir.values()) {
        const groups = [];
        for (const ff of f) {
          if (groups.length === 0) {
            groups.push([ff]);
            continue;
          }
          let hasLinked = false;
          for (const group of groups) {
            const linked = group.find(
              (cell) =>
                (cell[0] === ff[0] && Math.abs(cell[1] - ff[1]) === 1) ||
                (cell[1] === ff[1] && Math.abs(cell[0] - ff[0]) === 1)
            );
            if (linked) {
              group.push(ff);
              hasLinked = true;
              break;
            }
          }
          if (!hasLinked) groups.push([ff]);
        }
        console.log("groups", groups);
        fenceCount += groups.length;
      }

      sum += fenceCount * seen2.size;
    }
  }

  return sum;
}

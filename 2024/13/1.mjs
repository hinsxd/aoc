import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  // const lines = input.split("\n");
  // for (let i = 0; i < lines.length; i++) {
  //   const line = lines[i];
  //   l(line);
  // }
  let sum = 0;
  const blocks = input.split("\n\n");
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const [a, b, prize] = block.split("\n");
    let amatch = a.match(/X\+(\d+), Y\+(\d+)/);
    let bmatch = b.match(/X\+(\d+), Y\+(\d+)/);
    let prizematch = prize.match(/X=(\d+), Y=(\d+)/);
    const ax = parseInt(amatch[1]);
    const ay = parseInt(amatch[2]);
    const bx = parseInt(bmatch[1]);
    const by = parseInt(bmatch[2]);
    const prizex = parseInt(prizematch[1]);
    const prizey = parseInt(prizematch[2]);

    const amax = Math.min(Math.floor(prizex / ax), Math.floor(prizey / ay));
    const bmax = Math.min(Math.floor(prizex / bx), Math.floor(prizey / by));

    let minCost = -1;
    for (let aPress = 0; aPress <= amax; aPress++) {
      const amoveX = aPress * ax;
      const amoveY = aPress * ay;

      const bremainX = prizex - amoveX;
      const bremainY = prizey - amoveY;

      const bCanPressX = bremainX % bx === 0;
      const bCanPressY = bremainY % by === 0;
      if (!bCanPressX || !bCanPressY) continue;

      const bpressCountX = bremainX / bx;
      const bpressCountY = bremainY / by;
      if (bpressCountX !== bpressCountY) continue;
      if (bpressCountX < 0) continue;

      const cost = 3 * aPress + bpressCountX;
      if (minCost === -1) {
        minCost = cost;
      } else {
        minCost = Math.min(cost, minCost);
      }
    }
    if (minCost !== -1) sum += minCost;
  }

  return sum;
}

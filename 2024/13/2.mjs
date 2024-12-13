import { isInteger } from "lodash-es";
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
    const [aStr, bStr, prize] = block.split("\n");
    let amatch = aStr.match(/X\+(\d+), Y\+(\d+)/);
    let bmatch = bStr.match(/X\+(\d+), Y\+(\d+)/);
    let prizematch = prize.match(/X=(\d+), Y=(\d+)/);
    const a = parseInt(amatch[1]);
    const d = parseInt(amatch[2]);
    const b = parseInt(bmatch[1]);
    const e = parseInt(bmatch[2]);
    const c = parseInt(prizematch[1]) + 10000000000000;
    const f = parseInt(prizematch[2]) + 10000000000000;

    const det = a * e - b * d;
   
    const x = (c * e - f * b) / det;
    const y = (a * f - c * d) / det;
    if (isInteger(x) && isInteger(y) && x >= 0 && y >= 0) {
      sum += 3 * x + y;
    }
  }

  return sum;
}

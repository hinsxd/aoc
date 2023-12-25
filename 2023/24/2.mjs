import "utils/global.mjs";
import nerdamer from "nerdamer";
import "nerdamer/Solve.js";
const logger = new Logger(["test"], true);
logger.label("test")("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input
    .split("\n")
    .map((line) =>
      line
        .split(" @ ")
        .map((subline) => subline.split(", ").map((cs) => parseInt(cs)))
    );
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    const [[x, y, z], [vx, vy, vz]] = lines[i];

    console.log(`(x-${x})*(${vy}-b)=(y-${y})*(${vx}-a),`);
    console.log(`(y-${y})*(${vz}-c)=(z-${z})*(${vy}-b),`);
  }


  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return 0;
}

import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let ans = 0;
  function calFuel(mass) {
    const fuel = Math.floor(mass / 3) - 2;
    if (fuel <= 0) {
      return 0;
    }
    return fuel + calFuel(fuel);
  }
  for (let i = 0; i < lines.length; i++) {
    const line = parseInt(lines[i]);
    console.log(calFuel(line));
    ans += calFuel(line);
  }
  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return ans;
}

import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nums = line.split(" ").map((n) => parseInt(n));

    const seqs = [nums];

    function differentiate(nums) {
      const result = [];
      for (let i = 0; i < nums.length - 1; i++) {
        result.push(nums[i + 1] - nums[i]);
      }
      seqs.push(result);
      return result;
    }

    let d = differentiate(nums);

    while (!d.every((n) => n === 0)) {
      d = differentiate(d);
    }

    // extrapolate backward
    for (let i = seqs.length - 1; i >= 0; i--) {
      const seq = seqs[i];
      if (i === seqs.length - 1) {
        seq.unshift(0);
        continue;
      }

      const downSeq = seqs[i + 1];
      const newVal = seq[0] - downSeq[0];
      seq.unshift(newVal);
    }
    sum += seqs[0][0];
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}

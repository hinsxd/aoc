import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");
  let p1 = 0;
  let p2 = 0;
  for (let i = 0; i < lines.length; i++) {
    const nums = lines[i].split(" ").map((n) => parseInt(n));
    const seqs = [nums];

    function differentiate(nums) {
      const result = [];
      for (let i = 0; i < nums.length - 1; i++) {
        result.push(nums[i + 1] - nums[i]);
      }
      return result;
    }

    let d = nums;
    while (!d.every((n) => n === 0)) {
      d = differentiate(d);
      seqs.push(d);
    }

    for (let i = seqs.length - 1; i >= 0; i--) {
      const seq = seqs[i];
      if (i === seqs.length - 1) {
        // extrapolate forward
        seq.push(0);
        // extrapolate backward
        seq.unshift(0);
        continue;
      }

      const downSeq = seqs[i + 1];
      const newValNext = seq.at(-1) + downSeq.at(-1);
      const newPrevVal = seq[0] - downSeq[0];
      // extrapolate forward
      seq.push(newValNext);
      // extrapolate backward
      seq.unshift(newPrevVal);
    }

    p1 += seqs[0][seqs[0].length - 1];
    p2 += seqs[0][0];
  }
  return p1;
  // return p2;
}

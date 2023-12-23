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
    let subSum = 0;
    let [springs, combin] = lines[i].split(" ");

    const combins = combin.split(",").map((c) => parseInt(c));

    function verify(springsStr, combinArr) {
      // find consecutive #s separated by .
      const springs = [];
      let currentCount = 0;
      for (const c of springsStr) {
        if (c === "#") {
          currentCount += 1;
        } else if (c === ".") {
          if (currentCount > 0) {
            springs.push(currentCount);
            currentCount = 0;
          }
        }
      }
      if (currentCount > 0) {
        springs.push(currentCount);
      }

      return (
        combinArr.length === springs.length &&
        combinArr.every((s, i) => {
          return springs[i] === s;
        })
      );
    }

    const questionMarkIndexes = [];
    for (let i = 0; i < springs.length; i++) {
      if (springs[i] === "?") {
        questionMarkIndexes.push(i);
      }
    }

    // every ? can be either . or #
    // permuate every possible combination and verify it

    for (let i = 0; i < 2 ** questionMarkIndexes.length; i++) {
      const binary = i.toString(2).padStart(questionMarkIndexes.length, "0");
      const combination = binary.split("").map((b) => (b === "0" ? "." : "#"));
      let springsArr = springs.split("");
      for (let j = 0; j < questionMarkIndexes.length; j++) {
        springsArr[questionMarkIndexes[j]] = combination[j];
      }
      const str = springsArr.join("");
      if (verify(str, combins)) {
        subSum += 1;
      }
    }
    sum += subSum;

    // console.log(possibleCombinations);
  }

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return sum;
}

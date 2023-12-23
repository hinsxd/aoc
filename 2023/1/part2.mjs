const digitWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
/**
 *
 * @param {string} input
 * @returns
 */
export function part2(input) {
  let result = 0;
  for (const line of input.split("\n")) {
    const nums = [];
    let mode = "forward"; // 'forward' or 'backward'

    let currentIndex = 0;
    while (currentIndex >= 0 && currentIndex < line.length) {
      const c = line[currentIndex];

      // Indicates whether a match has been found or not
      let found = "";
      if (c >= "0" && c <= "9") {
        found = c;
      } else {
        for (let j = 0; j < digitWords.length; j++) {
          const word = digitWords[j];
          /**
           * If we're going backwards, we need to start from the end of the word
           * e.g. trying to check for 'three' in 'abcone2threeooo' from the end
           *      'abcone2threeooo'
           *                  ^ current index index is 11
           *              ^ we need to start from 11 - 5 + 1 = 7
           *      'abcone2threeooo'.startsWith('three', 11) === true
           */
          const startPos =
            mode === "forward" ? currentIndex : currentIndex - word.length + 1;
          if (line.startsWith(word, startPos)) {
            found = j.toString();
            break;
          }
        }
      }

      // The flow will be forward -> backward -> end
      if (mode === "forward") {
        if (found) {
          // finish finding forward direction, time for backward
          nums.push(found);
          mode = "backward";
          currentIndex = line.length - 1;
          continue;
        }
        // nothing found, keep going forward until index reaches the end
        currentIndex++;
      } else {
        if (found) {
          // finish finding background direction, time to end
          nums.push(found);
          break;
        }
        // nothing found, keep going forward until index reaches the end
        currentIndex--;
      }
    }

    if (nums.length > 0) {
      result += parseInt(nums[0] + nums[nums.length - 1]);
    }
  }
  return result;
}

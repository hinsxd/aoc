function extractNumbers(str) {
  console.log(matches);
  if (!matches) return NaN;
  return matches;
}

export function part1(input) {
  let result = 0;
  for (const line of input.split("\n")) {
    // const matches = line.match(/\d/g);
    // if (matches) {
    //   const nums = matches;
    //   result += parseInt(nums[0] + nums[nums.length - 1]);
    // }
    const nums = line.split("").filter((c) => c >= "0" && c <= "9");
    if (nums.length > 0) {
      result += parseInt(nums[0] + nums[nums.length - 1]);
    }
  }
  return result;
}

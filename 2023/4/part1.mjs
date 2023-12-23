export function part1(input) {
  const lines = input.split("\n").map((line) => line.split(":")[1]);

  const result = lines.reduce((result, info) => {
    const [winning, hand] = info.split("|").map((x) =>
      x
        .trim()
        .replace(/ +/g, ",")
        .split(",")
        .map((y) => parseInt(y.trim()))
    );

    const count = hand.filter((x) => winning.includes(x)).length;
    return result + (count > 0 ? Math.pow(2, count - 1) : 0);
  }, 0);

  return result;
}

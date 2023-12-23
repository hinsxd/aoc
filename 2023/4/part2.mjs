export function part2(input) {
  const lines = input.split("\n");

  const extraCards = {};
  const result = lines.reduce((result, line, index) => {
    const [, info] = line.split(":");
    const [winning, hand] = info.split("|").map((x) =>
      x
        .trim()
        .replace(/ +/g, ",")
        .split(",")
        .map((y) => parseInt(y.trim()))
    );
    const count = hand.filter((x) => winning.includes(x)).length;
    let totalCards = (extraCards[index] ?? 0) + 1;
    for (let c = 0; c < totalCards; c++) {
      for (let j = index + 1; j <= index + count; j++) {
        extraCards[j] = (extraCards[j] ?? 0) + 1;
      }
    }
    return result + totalCards;
  }, 0);
  return result;
}

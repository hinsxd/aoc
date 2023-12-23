export function part2(input) {
  const lines = input.split("\n");

  let sum = 0;
  for (const game of lines) {
    const [gameText, infoText] = game.split(": ");
    const id = gameText.replace("Game ", "").trim();

    const reveals = infoText.split("; ");
    const leastNumOfBalls = { red: 0, blue: 0, green: 0 };
    for (const reveal of reveals) {
      const infos = reveal.split(", ").map((x) => x.split(" "));
      for (const [numStr, color] of infos) {
        const num = parseInt(numStr);
        leastNumOfBalls[color] = Math.max(leastNumOfBalls[color], num);
      }
    }
    const { red, blue, green } = leastNumOfBalls;

    sum += red * blue * green;
  }
  return sum;
}

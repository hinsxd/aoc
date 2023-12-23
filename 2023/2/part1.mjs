function checkReveal(str) {
  // str is like "3 blue, 4 red, 5 green"
  for (const ball of str.split(", ")) {
    const [numStr, color] = ball.split(" ");
    const num = parseInt(numStr);
    if (color === "red" && num > 12) return false;
    if (color === "green" && num > 13) return false;
    if (color === "blue" && num > 14) return false;
  }
  return true;
}

export function part1(input) {
  const lines = input.split("\n");

  let sum = 0;
  // for (const game of lines) {
  //   const [gameText, infoText] = game.split(": ");
  //   const id = gameText.replace("Game ", "").trim();
  //   const possible = infoText
  //     .split("; ")
  //     .every((reveal) => checkReveal(reveal));
  //   if (possible) {
  //     sum += parseInt(id);
  //   }
  // }
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
    if (red <= 12 && green <= 13 && blue <= 14) {
      sum += parseInt(id);
    }
  }
  return sum;
}

import "utils/global.mjs";

const logger = new Logger([], true);
// logger.label("test")("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  // const lines = input.split("\n");
  // for (let i = 0; i < lines.length; i++) {
  //   const line = lines[i];
  //   logger(line);
  // }

  let [_ins, _inputs] = input.split("\n\n");
  let sum = 0;
  const f = _ins.split("\n").reduce((acc, curr) => {
    const [_, name, _steps] = curr.match(/^(.+)\{(.*)\}$/);
    const steps = _steps.split(",");
    console.log(steps);
    acc[name] = steps;
    return acc;
  }, {});
  console.log(f);

  const inputs = _inputs.split("\n");

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const [x, m, a, s] = input
      .slice(1, -1)
      .split(",")
      .map((l) => parseInt(l.split("=")[1]));
    let curr = "in";

    const obj = { x, m, a, s };
    while (curr !== "R" && curr !== "A") {
      const steps = f[curr];

      for (const step of steps) {
        if (step === "R") {
          curr = step;
          break;
        }
        if (step === "A") {
          curr = step;

          break;
        }
        if (!step.includes(":")) {
          curr = step;
          break;
        }

        const [cond, target] = step.split(":");

        const [, v, comp, n] = cond.match(/^(\w)([><])(\d+)$/);

        const value = obj[v];
        const ok = comp === ">" ? value > n : value < n;

        if (ok) {
          curr = target;
          break;
        }
      }
    }
    if (curr === "A") sum += Object.values(obj).reduce((s, c) => s + c, 0);
  }

  return sum;
}

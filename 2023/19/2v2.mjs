import "utils/global.mjs";

const logger = new Logger([], true);
// logger.label("test")("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  let [_ins, _inputs] = input.split("\n\n");
  const f = _ins.split("\n").reduce((acc, curr) => {
    const [_, name, _steps] = curr.match(/^(.+)\{(.*)\}$/);
    const steps = _steps.split(",").map((step) => {
      if (step.includes(":")) {
        const [cond, target] = step.split(":");
        const [, v, comp, n] = cond.match(/^(\w)([><])(\d+)$/);
        return {
          key: v,
          comp,
          n: parseInt(n),
          target,
        };
      } else {
        return step;
      }
    });
    acc[name] = [steps.slice(0, -1), steps.at(-1)];
    return acc;
  }, {});

  function count(ranges, curr = "in") {
    if (curr === "R") return 0;
    if (curr === "A") {
      let product = 1;
      for (const range of Ov(ranges)) {
        product *= range[1] - range[0] + 1;
      }
      return product;
    }
    const [conds, fallback] = f[curr];
    let sum = 0;

    let didBreak = false;
    for (const { key, comp, n, target } of conds) {
      const [min, max] = ranges[key];
      let T, F;
      if (comp === ">") {
        T = [n + 1, max];
        F = [min, n];
      } else {
        // < n
        T = [min, n - 1];
        F = [n, max];
      }

      if (T[0] <= T[1]) {
        const copy = _.cloneDeep(ranges);
        copy[key] = T;
        sum += count(copy, target);
      }
      if (F[0] <= F[1]) {
        // F is still a valid range,
        // edit the ranges object with the false range, so that subsequent steps can use it
        ranges[key] = F;
      } else {
        // F is not valid
        // all subsequent flow will not be valid anymore, skip everying
        return sum;
      }
    }
    sum += count(ranges, fallback);
    return sum;
  }

  return count(
    Object.fromEntries("xmas".split("").map((c) => [c, [1, 4000]])),
    "in"
  );
}

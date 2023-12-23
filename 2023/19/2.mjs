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
  let sum = 0;
  const f = _ins.split("\n").reduce((acc, curr) => {
    const [_, name, _steps] = curr.match(/^(.+)\{(.*)\}$/);
    const steps = _steps.split(",").map((step) => {
      if (step.includes(":")) {
        const [cond, target] = step.split(":");
        const [, v, comp, n] = cond.match(/^(\w)([><])(\d+)$/);
        return {
          key: v,
          comp,
          b: parseInt(n),
          target,
        };
      } else {
        return {
          key: "x",
          comp: ">",
          b: 0,
          target: step,
        };
      }
    });
    acc[name] = steps;
    return acc;
  }, {});

  function count(curr, prev = []) {
    if (curr === "R") return 0;
    if (curr === "A") {
      const obj = {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
      };
      for (const { key, comp, b, need } of prev) {
        let [min, max] = obj[key];
        if (comp === ">" && need) {
          min = Math.max(min, b + 1);
        }
        if (comp === "<" && need) {
          max = Math.min(max, b - 1);
        }
        if (comp === ">" && !need) {
          max = Math.min(max, b);
        }
        if (comp === "<" && !need) {
          min = Math.max(min, b);
        }
        obj[key] = [min, max];
      }
      // [2,10] ->

      return Object.values(obj).reduce(
        (acc, v) => acc * Math.max(v[1] - v[0] + 1, 0),
        1
      );
    }
    const conds = f[curr];

    let sum = 0;
    for (let i = 0; i < conds.length; i++) {
      const prevConds = conds.slice(0, i);
      const currentCond = conds[i];
      sum += count(currentCond.target, [
        ...prev,
        ...prevConds.map((c) => ({ ...c, need: false })),
        { ...currentCond, need: true },
      ]);
    }
    return sum;
  }

  return count("in");
}

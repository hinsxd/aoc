import "utils/global.mjs";

const logger = new Logger([], true);

/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const lines = input.split("\n");

  const m = {};

  const bitMap = {};

  for (let i = 0; i < lines.length; i++) {
    let [mname, _targets] = lines[i].split(" -> ").map((l) => l.trim());
    const targets = _targets.split(", ");

    switch (true) {
      case mname === "broadcaster":
        m[mname] = {
          name: mname,
          type: "broadcaster",
          from: [],
          targets,
        };
        break;
      case mname.startsWith("%"):
        m[mname.slice(1)] = {
          name: mname.slice(1),
          type: "ff",
          state: false,
          from: [],
          targets,
        };
        break;
      case mname.startsWith("&"):
        m[mname.slice(1)] = {
          name: mname.slice(1),
          type: "conj",
          memory: {},
          least: {},
          targets,
          from: [],
          cycle: Infinity,
        };
        break;
    }
  }

  m.button = {
    name: "button",
    type: "button",
    from: [],
    targets: ["broadcaster"],
  };
  for (const [k, conf] of Object.entries(m)) {
    conf.targets = conf.targets.map((label) => {
      if (!m[label]) {
        m[label] = {
          type: "untyped",
          name: label,
          from: [],
        };
      }

      m[label].from.push(conf);

      if (m[label].type === "conj") {
        m[label].memory[k] = false;
        m[label].least[k] = Infinity;
      }
      return m[label];
    });
  }
  const needTrues = Ov(m)
    .filter((mm) => mm.type === "conj")
    .find((mm) => mm.targets.find((t) => t.name === "rx"))?.from;

  let sum = 0;
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }

  while (sum < 100000) {
    sum++;
    // if (needTrues.every((t) => t.cycle !== Infinity)) {
    //   const lcm = needTrues
    //     .map((t) => t.cycle)
    //     .reduce((acc, curr) => {
    //       return (acc * curr) / gcd(acc, curr);
    //     }, 1);

    //   return lcm;
    // }

    const pulses = [
      {
        fromNode: m.button,
        toNode: m.broadcaster,
        pulse: false,
      },
    ];
    while (pulses.length) {
      const { fromNode, toNode, pulse } = pulses.shift();
      // if (toNode.name === "rx") {
      //   console.log(pulse);
      // }
      if (toNode.name === "rx" && !pulse) {
        return sum;
      }
      // if (toNode.type === "untyped") continue;

      const items = processPulse(fromNode, toNode, pulse, sum);
      pulses.push(...items);
    }
  }
  if (
    sum > 0 &&
    Ov(m).every((mm) => {
      if (mm.type === "ff") return mm.state === false;
      if (mm.type === "conj") return Ov(mm.memory).every((v) => !v);
      return true;
    })
  ) {
    console.log(sum);
    return 1;
  }
}

function processPulse(fromNode, toNode, pulse, n) {
  const newItems = [];
  switch (toNode.type) {
    case "broadcaster":
      newItems.push(
        ...toNode.targets.map((target) => ({
          fromNode: toNode,
          toNode: target,
          pulse,
        }))
      );
      break;
    case "ff":
      if (pulse === true) break;
      toNode.state = !toNode.state;
      newItems.push(
        ...toNode.targets.map((target) => ({
          fromNode: toNode,
          toNode: target,
          pulse: toNode.state,
        }))
      );
      break;
    case "conj":
      const wasAllMemoryHigh = Object.values(toNode.memory).every((v) => v);
      toNode.memory[fromNode.name] = pulse;

      const allMemoryLow = Object.values(toNode.memory).every((v) => !v);
      const allMemoryHigh = Object.values(toNode.memory).every((v) => v);
      if (wasAllMemoryHigh && allMemoryLow) {
        toNode.cycle = Math.min(toNode.cycle, n);
      }
      newItems.push(
        ...toNode.targets.map((target) => ({
          fromNode: toNode,
          toNode: target,
          pulse: !allMemoryHigh,
        }))
      );
    default:
      break;
  }
  return newItems;
}

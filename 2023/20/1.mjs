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

  for (let i = 0; i < lines.length; i++) {
    let [mname, _targets] = lines[i].split(" -> ").map((l) => l.trim());
    const targets = _targets.split(", ");

    switch (true) {
      case mname === "broadcaster":
        m[mname] = {
          name: mname,
          type: "broadcaster",
          targets,
        };
        break;
      case mname.startsWith("%"):
        m[mname.slice(1)] = {
          name: mname.slice(1),
          type: "ff",
          state: false,
          targets,
        };
        break;
      case mname.startsWith("&"):
        m[mname.slice(1)] = {
          name: mname.slice(1),
          type: "conj",
          memory: {},
          targets,
        };
        break;
    }
  }

  m.button = {
    name: "button",
    type: "button",
    targets: ["broadcaster"],
  };
  for (const [k, conf] of Object.entries(m)) {
    conf.targets = conf.targets.map((label) => {
      if (!m[label]) {
        m[label] = {
          type: "untyped",
        };
      }

      if (m[label].type === "conj") {
        m[label].memory[k] = false;
      }
      return m[label];
    });
  }

  let loSum = 0;
  let hiSum = 0;
  for (let i = 0; i < 1000; i++) {
    const pulses = [
      {
        fromNode: m.button,
        toNode: m.broadcaster,
        pulse: false,
      },
    ];
    while (pulses.length) {
      const { fromNode, toNode, pulse } = pulses.shift();
      // if (toNode.type === "untyped") continue;
      if (pulse === false) {
        loSum++;
      } else {
        hiSum++;
      }
      const items = processPulse(fromNode, toNode, pulse);
      pulses.push(...items);
    }
  }
  console.log({ loSum, hiSum });
  return loSum * hiSum;
}

function processPulse(fromNode, toNode, pulse) {
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
      toNode.memory[fromNode.name] = pulse;
      const allMemoryHigh = Object.values(toNode.memory).every((v) => v);
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

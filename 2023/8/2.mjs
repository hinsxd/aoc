import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns
 */
export default function part2(input) {
  const [instr, lines] = input.split("\n\n");
  const dict = new DefaultDict(() => ({ left: null, right: null }));

  const steps = instr.split("");
  const currNodes = [];

  for (const line of lines.split("\n")) {
    const [curr, nodes] = line.split(" = ");
    const [left, right] = nodes.replace(/[\(\)]/g, "").split(", ");
    dict.set(curr, { left, right });
    if (curr.endsWith("A")) currNodes.push(curr);
  }

  const counts = [];
  for (let i = 0; i < currNodes.length; i++) {
    let count = 0;
    let currStepIndex = 0;

    let curr = currNodes[i];

    while (!curr.endsWith("Z")) {
      const step = steps[currStepIndex];
      const { left, right } = dict.get(curr);
      curr = step === "L" ? left : right;
      count++;
      currStepIndex = (currStepIndex + 1) % steps.length;
    }
    counts.push(count);
  }

  // find the LCM of all counts
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
  const lcm = counts.reduce((acc, curr) => {
    return (acc * curr) / gcd(acc, curr);
  }, 1);

  return lcm;
}

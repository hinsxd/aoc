import "utils/global.mjs";

/**
 *
 * @param {string} input
 * @returns
 */
export default function part1(input) {
  const [instr, lines] = input.split("\n\n");
  const dict = new DefaultDict(() => ({ left: null, right: null }));

  const steps = instr.split("");

  for (const line of lines.split("\n")) {
    console.log(line);
    const [curr, nodes] = line.split(" = ");
    const [left, right] = nodes.replace(/[\(\)]/g, "").split(", ");
    dict.set(curr, { left, right });
  }

  let curr = "AAA";
  let count = 0;
  const target = "ZZZ";

  let currStepIndex = 0;
  function proceed() {
    count++;
    currStepIndex = (currStepIndex + 1) % steps.length;
  }

  while (curr !== target) {
    const step = steps[currStepIndex];
    const { left, right } = dict.get(curr);
    console.log(curr, step, step === "L" ? left : right);

    curr = step === "L" ? left : right;
    proceed();
  }
  return count;
}

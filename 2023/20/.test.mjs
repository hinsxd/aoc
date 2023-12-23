import fs from "fs";
import path from "path";
import * as url from "url";
import "utils/global.mjs";
import { describe, expect, test } from "vitest";
import part1 from "./1.mjs";
import part2 from "./2.mjs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const [year, day] = __dirname.split("/").slice(-3, -1);

const realInput = readFileContent(path.resolve(__dirname, "./input.txt"));
describe("day", () => {
  test("part1", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    expect(part1(file)).toBe(11687500);
    const answer = part1(realInput);
    console.log("part1 answer");
    console.log(answer);
    // write to file ./1.answer.txt
    fs.writeFileSync(path.resolve(__dirname, "./1.answer.txt"), String(answer));
  });

  test("part2", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    // const file = readFileContent(path.resolve(__dirname, "./test2.txt"));
    // expect(part2(file)).toBe(-1);
    // const answer = part2(realInput);
    // console.log("part2 answer");
    // console.log(answer);
    // // write to file ./1.answer.txt
    // fs.writeFileSync(path.resolve(__dirname, "./2.answer.txt"), String(answer));
  });

  test("print", () => {
    for (const line of realInput.split("\n")) {
      let [label, targets] = line.split(" -> ");
      console.log(`${label.slice(1)}=>operation: ${label.slice(1)}`)

      
    }
    for (const line of realInput.split("\n")) {
      let [label, targets] = line.split(" -> ");
      targets = targets.split(", ");

      for(const t of targets) {
        console.log(`${label.slice(1)}->${t}`)
      }
    }
  });
});
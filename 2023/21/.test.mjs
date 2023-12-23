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
    expect(part1(file, 6)).toBe(16);
    const answer = part1(realInput, 64);
    console.log("part1 answer");
    console.log(answer);
    // write to file ./1.answer.txt
    fs.writeFileSync(path.resolve(__dirname, "./1.answer.txt"), String(answer));
  });

  test("part2", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    // const file = readFileContent(path.resolve(__dirname, "./test2.txt"));

    // const answer = part2(realInput, 131 * 4 + 65);
    const answer = part2(realInput, 26501365);

    expect(answer).toBe(620348631910321);

    console.log("part2 answer");
    console.log(answer);
    // write to file ./1.answer.txt
    fs.writeFileSync(path.resolve(__dirname, "./2.answer.txt"), String(answer));
  });
});

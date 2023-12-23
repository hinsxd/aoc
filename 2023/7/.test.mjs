import path from "path";
import * as url from "url";
import "utils/global.mjs";
import { describe, expect, test } from "vitest";
import { part1 } from "./1.mjs";
import { part2 } from "./2.mjs";
import fs from "fs";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const realInput = readFileContent(path.resolve(__dirname, "./input.txt"));
const [year, day] = __dirname.split("/").slice(-3, -1);

describe("day", () => {
  test("part1", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    console.log(__dirname);
    expect(part1(file)).toBe(6440);
    console.log("part1 answer");
    console.log(part1(realInput));
  });

  test("part2", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    // const file = readFileContent(path.resolve(__dirname, "./test2.txt"));
    expect(part2(file)).toBe(5905);
    console.log("part2 answer");
    console.log(part2(realInput));
  });
});

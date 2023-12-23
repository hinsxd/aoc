import "utils/global.mjs";
import { describe, expect, test } from "vitest";
import { part1 } from "./part1.mjs";
import { part2 } from "./part2.mjs";
import * as url from "url";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

describe("day 4", () => {
  test("part 1", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    expect(part1(file)).toBe(8);
  });

  test("part 2", () => {
    const file = readFileContent(path.resolve(__dirname, "./test.txt"));
    expect(part2(file)).toBe(2286);
  });
});

import 'utils/global.mjs'

import { expect, test } from "vitest";
import { part1 } from "./1.mjs";
import { part2 } from "./2.mjs";
import * as url from "url";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));


test("day 5 part 1", () => {
  const file = readFileContent(path.resolve(__dirname, "./test.txt"));
  expect(part1(file)).toBe(35);
});
test("day 5 part 2", () => {
  const file = readFileContent(path.resolve(__dirname, "./test.txt"));
  expect(part2(file)).toBe(46);
});

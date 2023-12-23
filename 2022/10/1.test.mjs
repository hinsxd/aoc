import { expect, test } from "vitest";
import { part1 } from "./1.mjs";
import { readFileSync } from "fs";
import * as url from "url";
import path from "path";
import "utils/global.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

test("day 6 part 1", () => {
  const file = readFileContent(path.resolve(__dirname, "./test.txt"));
  expect(part1(file)).toBe(13140);
});

import "utils/global.mjs";
import path from "path";

import { part1 } from "./1.mjs";
import { part2 } from "./2.mjs";
import url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const f = path.resolve(__dirname, "./input.txt");

const file = readFileContent(f);

console.log("Part 1:", part1(file));
console.log("Part 2:", part2(file));

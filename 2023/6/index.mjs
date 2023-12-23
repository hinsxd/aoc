import { readFileContent } from "utils/index.mjs";
import path from "path";
import * as url from "url";

import { part1 } from "./1.mjs";
import { part2 } from "./2.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const f = process.argv[2] ?? path.resolve(__dirname, "./input.txt");

const file = readFileContent(f);


// console.log("Part 1:", part1(file));
console.log("Part 2:", part2(file));

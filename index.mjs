import "utils/global.mjs";
import path from "path";

import url from "url";
const [year, day] = process.argv.slice(2);

const { part1 } = await import(`./${year}/${day}/1.mjs`);
const { part2 } = await import(`./${year}/${day}/2.mjs`);

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const f = path.resolve(__dirname, `./${year}/${day}/input.txt`);

const file = readFileContent(f);

console.log("Part 1:", part1(file));
console.log("Part 2:", part2(file));

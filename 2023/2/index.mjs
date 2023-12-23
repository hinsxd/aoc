import { readFileSync } from "fs";
import { part1 } from "./part1.mjs";
import { part2 } from "./part2.mjs";

const result1 = part1(readFileSync("./day2/part1.txt", "utf-8"));
const result2 = part2(readFileSync("./day2/part1.txt", "utf-8"));

console.log("Part 1:", result1);
console.log("Part 2:", result2);

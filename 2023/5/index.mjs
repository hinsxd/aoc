import { readFileSync } from "fs";
import { part1 } from "./1.mjs";
import { part2 } from "./2.mjs";

const result1 = part1(readFileSync("./day5/part1.txt", "utf-8"));
const result2 = part2(readFileSync("./day5/part1.txt", "utf-8"));

console.log("Part 1:", result1);
console.log("Part 2:", result2);

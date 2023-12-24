import path from "path";
import * as url from "url";
import "utils/global.mjs";
import part2 from "./2.mjs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const [year, day] = __dirname.split("/").slice(-3, -1);

const realInput = readFileContent(path.resolve(__dirname, "./input.txt"));

const answer = part2(realInput);
console.log("part2 answer",answer);

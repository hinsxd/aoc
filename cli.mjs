import fs from "fs";
import { Command } from "@commander-js/extra-typings";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config();

const program = new Command()
  .option("-d, --day <day>", "day", (v) => parseInt(v), new Date().getDate())
  .option(
    "-y, --year <year>",
    "year",
    (v) => parseInt(v),
    new Date().getFullYear()
  )
  .option("--session <session>", "session", process.env.SESSION)
  .option("-i, --ignoreSolved", "ignore solved")
  .option("-s, --submit <part>", "submit part")
  .option("-t, --test-only", "no need to open files automatically")
  .option("-o, --once", "Do not watch test")
  .parse();

const { day, year, session, ignoreSolved, submit, testOnly, once } =
  program.opts();
console.log(year, day);
if (!session) {
  console.error(
    "Session is required. Put SESSION in .env or pass with --session option"
  );
  process.exit(1);
}
const client = axios.create({
  baseURL: "https://adventofcode.com/",
  headers: {
    cookie: `session=${session}`,
  },
});

async function handleSubmit() {
  const answer = fs.readFileSync(`./${year}/${day}/${submit}.answer.txt`, {
    encoding: "utf-8",
  });

  const result = await client.post(
    `/${year}/day/${day}/answer`,
    `level=${submit}&answer=${answer}`,
    {
      responseType: "document",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const completed = result.data.includes("already complete");
  if (completed) {
    console.log("Already completed");
    process.exit(1);
  }
  const wrong = result.data.includes(`If you're stuck`);
  console.log(!wrong ? "Correct" : "Wrong");
  process.exit(0);
}

if (submit && !testOnly) {
  // read file from `/year/day/${submit}.answer.txt`
  await handleSubmit();
}
const targetFolder = `./${year}/${day}`;

if (!testOnly) {
  const status = await getInput();
  openFiles(status);
}

// start vitest on target folder
startTest();
// open targetFolder/_.mjs in vscode

async function getInput() {
  try {
    const webResult = await client.get(`/${year}/day/${day}`, {
      responseType: "text",
    });

    const webHtml = webResult.data;

    // if no 'Your puzzle answer was' in webHtml, status = 0
    // if there are one 'Your puzzle answer was' in webHtml, status = 1
    // if there are two 'Your puzzle answer was' in webHtml, status = 2
    const status = webHtml.split("Your puzzle answer was").length - 1;

    if (status === 2) {
      if (!ignoreSolved) {
        console.log("Already solved");
        process.exit(1);
      }
    }
    const inputResult = await client.get(`/${year}/day/${day}/input`, {
      responseType: "text",
    });
    /**
     * @type {string}
     */
    const data = inputResult.data.trim();

    if (!fs.existsSync(targetFolder)) {
      fs.cpSync(`./template`, targetFolder, { recursive: true });
    }
    if (!fs.existsSync(`${targetFolder}/test.txt`)) {
      fs.writeFileSync(`${targetFolder}/test.txt`, "", {
        encoding: "utf-8",
      });
    }

    fs.writeFileSync(`${targetFolder}/input.txt`, data, {
      encoding: "utf-8",
    });
    return status;
  } catch (e) {
    if (e instanceof AxiosError) {
      const d = e.response.data;
      if (typeof d === "string") {
        if (d.includes("this endpoint before it unlocks")) {
          console.error("Too early");
          process.exit(1);
        }
      }
      console.error("Error");
      console.log(e);
      process.exit(1);
    }
  }
}

function startTest() {
  if (once) {
    const p = spawn("npx", ["vitest", "--run", targetFolder], {
      stdio: "inherit",
    });
    p.on("exit", (code) => {
      if (code === 0 && submit) {
        handleSubmit()
      }
    });
  } else {
    spawn("npx", ["vitest", "--watch", targetFolder], {
      stdio: "inherit",
    });
  }
}

async function openFiles(status = -1) {
  if (status !== 1) {
    spawn("code", [`${targetFolder}/1.mjs`], {
      stdio: "inherit",
    });
  }
  if (status !== 0) {
    spawn("code", [`${targetFolder}/2.mjs`], {
      stdio: "inherit",
    });
  }

  console.log("update test expected result");

  await new Promise((resolve) => setTimeout(resolve, 500));
  spawn("code", [`${targetFolder}/.test.mjs`], {
    stdio: "inherit",
  });
  await new Promise((resolve) => setTimeout(resolve, 500));
  spawn("code", [`${targetFolder}/test.txt`], {
    stdio: "inherit",
  });
}

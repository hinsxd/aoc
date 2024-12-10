import "utils/global.mjs";

const l = new Logger([], true).label("Question 1");
l("test");
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const line = input;
  /**
   * @type{{isFile:boolean, fileId?: number}[]}
   */
  const b = [];
  for (let i = 0; i < line.length; i++) {
    const length = parseInt(line[i]);
    const isFile = i % 2 === 0;
    const fileId = Math.floor(i / 2);
    for (let j = 0; j < length; j++)
      b.push({
        fileId,
        isFile,
      });
  }

  let l = 0;
  let r = b.length - 1;

  while (l <= r) {
    if (b[l].isFile) {
      l++;
      continue;
    }
    if (!b[r].isFile) {
      r--;
      continue;
    }
    b[l] = b[r];
    b[r] = {
      isFile: false,
    };
    l++;
    r--;
  }

  const checksum = b.reduce((s, cur, i) => {
    if (!cur.isFile) return s;
    console.log(i);
    return s + cur.fileId * i;
  }, 0);

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return checksum;
}

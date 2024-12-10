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
   * @type{{isFile:boolean, fileId?: number, size: number}[]}
   */
  const b = [];
  for (let i = 0; i < line.length; i++) {
    const length = parseInt(line[i]);
    const isFile = i % 2 === 0;
    const fileId = Math.floor(i / 2);

    isFile
      ? b.push({
          size: length,
          isFile,
          fileId,
        })
      : b.push({
          size: length,
          isFile,
        });
  }

  let l = 0;
  let r = b.length - 1;

  for (let i = b.length - 1; i >= 0; i--) {
    const source = b[i];
    if (!source.isFile) continue;
    for (let j = 0; j < i; j++) {
      const target = b[j];
      if (target.isFile) continue;
      if (target.size < source.size) continue;
      // fill the file into empty
      /** @type{typeof b} */
      const leftNew = [
        {
          size: source.size,
          isFile: true,
          fileId: source.fileId,
        },
      ];
      /** @type{typeof b} */
      const rightNew = [
        {
          size: source.size,
          isFile: false,
        },
      ];
      if (target.size > source.size) {
        leftNew.push({
          size: target.size - source.size,
          isFile: false,
        });
      }
      b.splice(i, 1, ...rightNew);
      b.splice(j, 1, ...leftNew);
      break;
    }
  }

  // final sweep
  // for (let i = 0; i < b.length; i++) {
  //   const curr = b[i];
  //   if (curr.isFile) continue;
  //   while (b[i + i] && !b[i + 1].isFile) {
  //     curr.size += b[i + 1].size;
  //     b.splice(i + 1, 1);
  //   }
  // }
  console.log(b);

  const checksum = b.reduce(
    (s, cur, i) => {
      if (!cur.isFile) {
        return {
          startIdx: s.startIdx + cur.size,
          sum: s.sum,
        };
      }

      const { size, fileId } = cur;
      let sum = 0;
      for (let i = 0; i < size; i++) {
        sum += (s.startIdx + i) * fileId;
      }
      return { startIdx: s.startIdx + size, sum: s.sum + sum };
    },
    { startIdx: 0, sum: 0 }
  );

  // const blocks = input.split("\n\n");
  // for (let i = 0; i < blocks.length; i++) {
  //   const block = blocks[i];
  //   console.log(block);
  // }

  return checksum.sum;
}

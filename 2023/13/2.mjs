import "utils/global.mjs";

function hummingDistance(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) count++;
  }
  return count;
}

function findMirror(arr, dist) {
  for (let i = 1; i < arr.length; i++) {
    let a = arr.slice(0, i).reverse();
    let b = arr.slice(i);
    const min = Math.min(a.length, b.length);
    a = a.slice(0, min).join("");
    b = b.slice(0, min).join("");
    if (hummingDistance(a, b) === dist) {
      console.log(`(2) ${i - 1}, ${i} is mirror`);
      return i;
    }
  }
  return 0;
}
/**
 *
 * @param {string} input
 * @returns {number}
 */
export default function (input) {
  const blocks = input.split("\n\n");
  let sum = 0;
  for (const block of blocks) {
    const arr = block.split("\n");

    const transposed = arr[0]
      .split("")
      .map((_, colIndex) => arr.map((row) => row[colIndex]).join(""));

    console.log("row");
    const rowsMirror = findMirror(arr, 1);
    sum += 100 * rowsMirror;

    console.log("col");
    const colsMirror = findMirror(transposed, 1);
    sum += colsMirror;
    console.log([rowsMirror, colsMirror]);
  }

  return sum;
}

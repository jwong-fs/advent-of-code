const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const assignmentPairs = rawInput
  .split("\n")
  .map(pair => pair.split(",").map(range => range.split("-")));

const getSumOfContainedPairs = pairs => {
  let sum = 0;
  for (let pair of pairs) {
    const [first, second] = pair;
    const start1 = Number(first[0]);
    const end1 = Number(first[1]);
    const start2 = Number(second[0]);
    const end2 = Number(second[1]);

    const firstContainsSecond = start1 <= start2 && end1 >= end2;
    const secondContainsFirst = start2 <= start1 && end2 >= end1;
    if (firstContainsSecond || secondContainsFirst) {
      sum += 1;
    }
  }
  return `The total pairs of elf assignments that are contained is: ${sum}`;
};

const getSumOfOverlappedPairs = pairs => {
  let sum = 0;
  for (let pair of pairs) {
    const [first, second] = pair;
    const start1 = Number(first[0]);
    const end1 = Number(first[1]);
    const start2 = Number(second[0]);
    const end2 = Number(second[1]);

    const firstOverlapsSecond = end1 >= start2 && end1 <= end2;
    const secondOverlapsFirst = end2 >= start1 && end2 <= end1;
    if (firstOverlapsSecond || secondOverlapsFirst) {
      sum += 1;
    }
  }
  return `The total pairs of elf assignments that overlap are: ${sum}`;
};

console.log(getSumOfContainedPairs(assignmentPairs));
console.log(getSumOfOverlappedPairs(assignmentPairs));

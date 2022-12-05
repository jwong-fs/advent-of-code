const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const rucksacks = rawInput.split("\n");

const lowercaseItems = "abcdefghijklmnopqrstuvwxyz";
const uppercaseItems = lowercaseItems.toUpperCase();
const rucksackItems = " " + lowercaseItems + uppercaseItems;

const splitIntoThrees = array => {
  const perChunk = 3; // items per chunk

  const result = array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return result;
};

const getSumOfBadgePriorities = rucksacks => {
  const groupsOfElves = splitIntoThrees(rucksacks);
  let sum = 0;
  for (let group of groupsOfElves) {
    const [first, second, third] = group;
    const firstSeen = new Set(first);
    const secondSeen = new Set(second);
    for (let item of third) {
      if (firstSeen.has(item) && secondSeen.has(item)) {
        sum += rucksackItems.indexOf(item);
        break;
      }
    }
  }
  return `The sum of badge priorities is ${sum}`;
};

console.log(getSumOfBadgePriorities(rucksacks));

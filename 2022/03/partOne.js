const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const rucksacks = rawInput.split("\n").map(rucksack => {
  const mid = rucksack.length / 2;
  return [rucksack.slice(0, mid), rucksack.slice(mid)];
});

const lowercaseItems = "abcdefghijklmnopqrstuvwxyz";
const uppercaseItems = lowercaseItems.toUpperCase();
const rucksackItems = " " + lowercaseItems + uppercaseItems;

const getSumOfPriorities = rucksacks => {
  let sum = 0;
  for (let rucksack of rucksacks) {
    const [first, second] = rucksack;
    const firstSeen = new Set(first);
    for (let item of second) {
      if (firstSeen.has(item)) {
        sum += rucksackItems.indexOf(item);
        break;
      }
    }
  }
  return `The sum of item priorities from both rucksacks is ${sum}`;
};

console.log(getSumOfPriorities(rucksacks));

const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const calories = rawInput.split("\n");

let maxSoFar = -Infinity;
let curr = 0;

for (let calorie of calories) {
  if (calorie === "") {
    maxSoFar = Math.max(maxSoFar, curr);
    curr = 0;
  } else {
    curr += Number(calorie);
  }
}

console.log(`The max amount of calories carried by an elf is: ${maxSoFar}`);

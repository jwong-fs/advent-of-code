const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const arrayInput = rawInput.split("\n");

const findMaxCalories = calories => {
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

  return `The max amount of calories carried by an elf is: ${maxSoFar}`;
};

console.log(findMaxCalories(arrayInput));

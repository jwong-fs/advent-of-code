const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const arrayInput = rawInput.split("\n");

const findMaxThreeCalories = calories => {
  // Use an array to store the three max amount of calories carried, from highest to lowest.
  let maxThreeCals = [0, 0, 0];
  let curr = 0;

  for (let calorie of calories) {
    if (calorie === "") {
      let [first, second, third] = maxThreeCals;
      if (curr > first) {
        maxThreeCals[2] = second;
        maxThreeCals[1] = first;
        maxThreeCals[0] = curr;
      } else if (curr > second) {
        maxThreeCals[2] = second;
        maxThreeCals[1] = curr;
      } else if (curr > third) {
        maxThreeCals[2] = curr;
      }
      curr = 0;
    } else {
      curr += Number(calorie);
    }
  }

  let sum = 0;
  for (let cal of maxThreeCals) {
    sum += cal;
  }

  return `The sum of the three maximum amount of calories carried by the elves is: ${sum}`;
};

console.log(findMaxThreeCalories(arrayInput));

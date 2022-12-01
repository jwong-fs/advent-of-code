const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const calories = rawInput.split("\n");

// Use an array to store the three max amount of calories carried, from highest to lowest.
let topThreeCals = [0, 0, 0];
let curr = 0;

for (let calorie of calories) {
  if (calorie === "") {
    let [first, second, third] = topThreeCals;
    if (curr > first) {
      topThreeCals[2] = topThreeCals[1];
      topThreeCals[1] = topThreeCals[0];
      topThreeCals[0] = curr;
    } else if (curr > second) {
      topThreeCals[2] = topThreeCals[1];
      topThreeCals[1] = curr;
    } else if (curr > third) {
      topThreeCals[2] = curr;
    }
    curr = 0;
  } else {
    curr += Number(cal);
  }
}

let sum = 0;
for (let cal of topThreeCals) {
  sum += cal;
}

console.log(
  `The sum of the three maximum amount of calories carried by the elves is: ${sum}`
);

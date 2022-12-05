const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const guide = rawInput.split("\n").map(pair => {
  return pair.split(" ");
});

const shapePoints = {
  X: 1,
  Y: 2,
  Z: 3
};

const shapeMatches = {
  A: "X",
  B: "Y",
  C: "Z"
};

const winsOver = {
  A: "Y",
  B: "Z",
  C: "X"
};

const shapeSelectionScore = shape => {
  return shapePoints[shape];
};

const roundOutcomeScore = (a, b) => {
  if (winsOver[a] === b) {
    return 6;
  }
  if (shapeMatches[a] === b) return 3;
  return 0;
};

const totalPredictedScore = guide => {
  let sum = 0;
  for (let round of guide) {
    const [a, b] = round;
    const currScore = shapeSelectionScore(b) + roundOutcomeScore(a, b);
    sum += currScore;
  }
  return `The predicted score based on assumptions is: ${sum}`;
};

console.log(totalPredictedScore(guide));

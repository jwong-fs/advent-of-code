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

const losesFrom = {
  A: "Z",
  B: "X",
  C: "Y"
};

const roundOutcomeScore2 = b => {
  if (b === "X") return 0;
  if (b === "Y") return 3;
  if (b === "Z") return 6;
};

const shapeSelectionScore2 = (score, a) => {
  if (score === 6) return shapePoints[winsOver[a]];
  if (score === 3) return shapePoints[shapeMatches[a]];
  return shapePoints[losesFrom[a]];
};

const totalActualScore = guide => {
  let sum = 0;
  for (let round of guide) {
    const [a, b] = round;
    let currScore = roundOutcomeScore2(b);
    currScore += shapeSelectionScore2(currScore, a);
    sum += currScore;
  }
  return `The actual score from the strategy is: ${sum}`;
};

console.log(totalActualScore(guide));

const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

// initialize a pointer to loop through the input string
let i = 0;

// function returns a string of just the crates
const cratesSection = input => {
  // look through each char and stop before we hit the instructions
  while (input[i] !== "m") {
    i++;
  }
  // there are 3 spaces between the 2 sections
  return input.slice(0, i - 3);
};

// function returns a nested array of just the set of instructions
const stepsSection = input => {
  return (
    input
      .slice(i)
      .split("\n")
      .map(step => step.split(" "))
      // return only the amt of crates to move, the col to move from, and the col to move to
      .map(step => [step[1], step[3], step[5]])
  );
};

let crates = cratesSection(rawInput);
let steps = stepsSection(rawInput);

// function sorts the string of crates into a data structure stack of crates
const parseCratesIntoStacks = crates => {
  // # of columns
  let col = Number(crates[crates.length - 1]);
  // initialize an array with a length of col containing empty []s
  let stacks = new Array();
  for (let i = 0; i < col; i++) {
    stacks.push([]);
  }

  // initialize a pointer to loop through the crates string
  let pointer = 0;
  // track the current column
  let currCol = 0;
  while (pointer < crates.length - 1) {
    // every 3 spaces is either a "   " or a letter crate
    let curr = crates.slice(pointer, pointer + 3);
    // populate the stacks starting from the beginning (we want the top-most crates to be at the end of the stacks)
    stacks[currCol % col].unshift(curr);
    currCol++;
    if (currCol % col === col) {
      // increment 1 when at the end of the row in the string
      pointer += 1;
    } else {
      // otherwise increment 4 to move pointer to the next crate in the same row
      pointer += 4;
    }
  }

  // remove empty areas from the stacks - we don't need them!
  for (let stack of stacks) {
    while (stack[stack.length - 1] === "   ") {
      stack.pop();
    }
  }
  return stacks;
};

const findTopCratesPartOne = (crates, steps) => {
  let stacks = parseCratesIntoStacks(crates);
  for (let step of steps) {
    // number of crates to move
    let amt = Number(step[0]);
    // col to move from
    let origin = Number(step[1]) - 1;
    // col to move to
    let end = Number(step[2]) - 1;

    // for each step, while there are still crates to move, pop and push them from the right cols
    while (amt > 0) {
      const crate = stacks[origin].pop();
      stacks[end].push(crate);
      amt--;
    }
  }
  const result = stringifyTopCrates(stacks);
  return `The string of top crates after being moved individually is: ${result}`;
};

const findTopCratesPartTwo = (crates, steps) => {
  let stacks = parseCratesIntoStacks(crates);
  for (let step of steps) {
    // number of crates to move
    let amt = Number(step[0]);
    // col to move from
    let origin = Number(step[1]) - 1;
    // col to move to
    let end = Number(step[2]) - 1;

    // extract the group of crates being moved
    let group = stacks[origin].splice(stacks[origin].length - amt);
    // concatenate the group of crates being moved with the stack that it's moved to
    stacks[end] = [...stacks[end], ...group];
  }
  const result = stringifyTopCrates(stacks);
  return `The string of top crates after being moved as a group is: ${result}`;
};

// function take the last element of each stack of crates and string them together
const stringifyTopCrates = stacks => {
  let string = "";
  for (let stack of stacks) {
    // the letter is between brackets, which is at the crate's index of 1
    string += stack[stack.length - 1][1];
  }
  return string;
};

console.log(findTopCratesPartOne(crates, steps));
console.log(findTopCratesPartTwo(crates, steps));

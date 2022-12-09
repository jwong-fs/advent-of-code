const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const findFirstMarker = (s, n) => {
  // hold seen chars
  const visited = {};
  // hold first char of a non-repeating substring
  let startIdx = 0;

  // loop through s
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // if char is seen AND occurs after startIdx
    if (visited[char] >= 0 && visited[char] >= startIdx) {
      // re-evaluate to get the closer startIdx
      startIdx = Math.max(visited[char] + 1, startIdx);
    }

    // otherwise or afterwards, add char to seen
    visited[char] = i;
    // plus 1 to account for when startIdx === i
    if (i - startIdx + 1 === n) {
      // plus 1 to return the int AFTER current idx
      return `The first ${n}-letter marker is: ${i + 1}`;
    }
  }
  return "bye";
};

// Part One
console.log(findFirstMarker(rawInput, 4));

// Part Two
console.log(findFirstMarker(rawInput, 14));

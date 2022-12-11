const fs = require("fs");
const path = require("path");

let rawInput = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

input = rawInput.split("\n");

const buildDirectory = commands => {
  const directory = {};
  // build up an object to represent the directory

  let currDir = directory;
  // keep track of the current directory

  let i = 0;
  // keep track of the current index in commands

  while (i < commands.length) {
    let command = commands[i];

    if (command[0] === "$") {
      if (command === "$ ls") {
        // while we're listing, fast track through i
        i += 1;
        while (commands[i] && commands[i][0] !== "$") {
          command = commands[i];

          if (command[0] === "d") {
            // add a directory
            const name = command.split(" ")[1];
            currDir[name] = { prev: currDir };
          } else {
            // add a file and its size
            const [size, name] = command.split(" ");
            currDir[name] = Number(size);
          }
          i++;
        }
      } else if (command === "$ cd ..") {
        // change to prev dir
        currDir = currDir.prev;
        i++;
      } else if (command === "$ cd /") {
        // change to / dir
        currDir["/"] = {};
        currDir = currDir["/"];
        i++;
      } else {
        // change into a specific directory
        const name = command.split(" ")[2];
        currDir = currDir[name];
        i++;
      }
    }
  }
  return directory;
};

const getDirSizes = (dir, sizes) => {
  let sum = 0;
  for (let key in dir) {
    if (key === "prev") continue;
    // exclude keys that are keeping track of parent object

    if (typeof dir[key] === "number") {
      // include keys to a file size
      sum += dir[key];
    } else {
      // traverse through keys that are an object
      sum += getDirSizes(dir[key], sizes);
    }
  }

  sizes.push(sum);
  return sum;
};

const sumOfDirectorySizesLessThan100000 = sizes => {
  let sum = 0;
  for (let size of sizes) {
    // We only care about file sizes <= 100000
    if (size <= 100000) sum += size;
  }

  return `The sum of all directories less than 100000 is: ${sum}`;
};

const minDirectorySizeToRemove = (sizes, total) => {
  let sum = Infinity;
  for (let size of sizes) {
    // System holds a max of 70000000 and the required unused space is 30000000
    // The most that current files can hold is 40000000
    // We want to loop through each size, subtract from the total, and get as close to 40000000 as possible (less than or equal to)
    if (40000000 >= total - size) {
      sum = Math.min(sum, size);
    }
  }

  return `The smallest directory to remove is: ${sum}`;
};

const noSpaceLeftOnDevice = (commands, part) => {
  const directory = buildDirectory(commands);
  const sizes = [];
  const total = getDirSizes(directory, sizes);

  if (part === "partOne") {
    return sumOfDirectorySizesLessThan100000(sizes);
  } else if (part === "partTwo") {
    return minDirectorySizeToRemove(sizes, total);
  } else {
    return `Please enter a valid part to this challenge!`;
  }
};

console.log(noSpaceLeftOnDevice(input, "partOne"));
console.log(noSpaceLeftOnDevice(input, "partTwo"));

//start by reading the text file in
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

type RotationResult = {
  newPosition: number;
  rotations: number;
};

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function readInput(filePath: string): Promise<string[]> {
  const content = await readFile(filePath, 'utf-8');
  return content.split('\n').map((line) => line.trim());
}

function rightRotation(
  currentPosition: number,
  amount: number
): RotationResult {
  let rotations = 0;

  // Check each individual click
  for (let i = 1; i <= amount; i++) {
    const clickPosition = (currentPosition + i) % 100;
    if (clickPosition === 0) {
      rotations++;
    }
  }

  const newPosition = (currentPosition + amount) % 100;
  return {
    newPosition,
    rotations,
  };
}

function leftRotation(currentPosition: number, amount: number): RotationResult {
  let rotations = 0;

  // Check each individual click
  for (let i = 1; i <= amount; i++) {
    const clickPosition = (currentPosition - i + 100) % 100;
    if (clickPosition === 0) {
      rotations++;
    }
  }

  const newPosition = (currentPosition - amount + 100) % 100;
  return {
    newPosition,
    rotations,
  };
}
function calculateNewPosition(
  currentPosition: number,
  move: string
): RotationResult {
  //check the first charater of the move if its L or R
  const direction = move.charAt(0);
  if (direction !== 'L' && direction !== 'R') {
    throw new Error(`Invalid move direction: ${direction}`);
  }
  //get the rest of the string as a number (this is the amount that we are moving, either left or right)
  //take it as the rest of the string after the first character
  const amount = Number(move.slice(1));
  if (isNaN(amount)) {
    throw new Error(`Invalid move amount: ${move.slice(1)}`);
  }
  //if direction is L, then minus it from the current value
  if (direction == 'L') {
    return leftRotation(currentPosition, amount);
    //for the circular nature of the dial
  } else if (direction == 'R') {
    return rightRotation(currentPosition, amount);
    //this time without adding 100 because we are moving right and don't ned to worry about negative values
  } else {
    throw new Error(`Invalid move direction: ${direction}`);
  }
}

function iterateMoves(moves: string[], startPosition: number): number {
  let currentPosition = startPosition;
  let zeroCount = 0;

  for (const move of moves) {
    const result = calculateNewPosition(currentPosition, move);
    currentPosition = result.newPosition;
    zeroCount += result.rotations; // Add the number of times we crossed 0!
  }

  return zeroCount;
}

async function main() {
  const filePath = join(__dirname, 'input.txt');
  const content = await readInput(filePath);
  const startPosition = 50;
  const zeroCount = iterateMoves(content, startPosition);
  console.log(`Zero Count: ${zeroCount}`);
}

await main();

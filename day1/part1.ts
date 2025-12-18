//start by reading the text file in
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function readInput(filePath: string): Promise<string[]> {
  const content = await readFile(filePath, 'utf-8');
  return content.split('\n').map((line) => line.trim());
}

function calculateNewPosition(currentPosition: number, move: string): number {
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
    return (currentPosition - amount + 100) % 100; //we add 100 before mod to avoid negative values, and to account
    //for the circular nature of the dial
  } else if (direction == 'R') {
    return (currentPosition + amount) % 100; //mod 100 to account for circular nature of the dial
    //this time without adding 100 because we are moving right and don't ned to worry about negative values
  } else {
    throw new Error(`Invalid move direction: ${direction}`);
  }
}

function iterateMoves(moves: string[], startPosition: number): number {
  let currentPosition = startPosition;
  let zeroCount = 0;
  for (const move of moves) {
    currentPosition = calculateNewPosition(currentPosition, move);
    if (currentPosition === 0) {
      zeroCount++;
    }
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

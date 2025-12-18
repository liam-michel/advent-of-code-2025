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

function parseToNumbers(lines: string[]): number[][] {
  return lines.map((line) => line.split('').map((num) => parseInt(num)));
}
function findHighestValue(line: number[]): number {
  let maxValue = 0;
  let maxSoFar = 0; // Track the maximum digit we've seen from the right

  // Traverse from right to left
  for (let i = line.length - 1; i >= 1; i--) {
    maxSoFar = Math.max(maxSoFar, line[i]);

    // line[i-1] is our tens digit, maxSoFar is our units digit
    const value = line[i - 1] * 10 + maxSoFar;
    maxValue = Math.max(maxValue, value);
  }

  return maxValue;
}

const main = async () => {
  const inputPath = join(__dirname, 'input.txt');
  const rawData = await readInput(inputPath);
  const parsedLines = parseToNumbers(rawData);
  const total = parsedLines.reduce((acc, line) => {
    console.log('Processing line:', line);
    const total = findHighestValue(line);
    console.log('Line total:', total);
    return acc + total;
  }, 0);

  console.log(`The total score is: ${total}`);
};

await main();

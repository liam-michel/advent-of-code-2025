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

function findLargestKDigitNumber(line: number[], k: number): bigint {
  const n = line.length;
  const result: number[] = [];

  // We need to keep k digits, so we can remove (n - k) digits
  let toRemove = n - k;

  for (let i = 0; i < n; i++) {
    // While we have digits in result and the current digit is larger than the last one
    // and we still have removals left
    while (
      result.length > 0 &&
      result[result.length - 1] < line[i] &&
      toRemove > 0
    ) {
      result.pop();
      toRemove--;
    }

    result.push(line[i]);
  }

  // Remove any excess digits from the end if we didn't remove enough
  while (result.length > k) {
    result.pop();
  }

  // Convert array of digits to bigint
  return BigInt(result.join(''));
}

const main = async () => {
  const inputPath = join(__dirname, 'input.txt');
  const rawData = await readInput(inputPath);
  const parsedLines = parseToNumbers(rawData);

  console.log('\n--- Part 2 ---');
  let totalPart2 = BigInt(0);
  for (const line of parsedLines) {
    console.log('Processing line:', line.join(''));
    const total = findLargestKDigitNumber(line, 12);
    console.log('Line total:', total.toString());
    totalPart2 += total;
  }

  console.log(`\nPart 2 total: ${totalPart2.toString()}`);
};
await main();

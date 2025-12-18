import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readInput = async (filePath: string): Promise<string[]> => {
  const content = await readFile(filePath, 'utf-8');
  return content.split('\n').map((line) => line.trim());
};

const parsePairs = (line: string): string[] => {
  return line.split(',');
};

const checkRepeatedSequence = (code: string): number[] => {
  const [first, second] = code.split('-').map(Number);
  const repeated: number[] = [];
  for (let i = first; i <= second; i++) {
    const halfLength = i.toString().length / 2;
    const firstHalf = i.toString().slice(0, halfLength);
    const secondHalf = i.toString().slice(halfLength);
    if (firstHalf === secondHalf) {
      repeated.push(i);
    }
  }
  return repeated;
};

const checkCodes = (codes: string[]): number[] => {
  //loop over each code pair, gather the repeated sequences, and then flat map all of those together
  const invalidCodes = codes.flatMap((code) => checkRepeatedSequence(code));
  return invalidCodes;
};
const main = async () => {
  const filePath = join(__dirname, 'input.txt');
  const content = await readInput(filePath);
  const parsedPairs = parsePairs(content[0]);
  console.log(`Parsed Codes: ${parsedPairs.join(', ')}`);
  const invalidCodes = checkCodes(parsedPairs);
  console.log(`Codes with Repeated Sequences: ${invalidCodes.join(', ')}`);
  const invalidCodeSum = invalidCodes.reduce(
    (sum, code) => sum + Number(code),
    0
  );
  console.log(`Sum of invalid codes: ${invalidCodeSum}`);
};

await main();

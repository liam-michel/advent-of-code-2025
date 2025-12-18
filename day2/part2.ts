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
    const numString = i.toString();

    for (
      let seqLength = 1;
      seqLength <= Math.floor(numString.length / 2);
      seqLength++
    ) {
      const pattern = numString.slice(0, seqLength);

      // Check if the pattern repeats to fill the entire number
      const repetitions = numString.length / seqLength;

      // Only check if it divides evenly (otherwise it can't be a perfect repetition)
      if (numString.length % seqLength === 0) {
        // Manually build the repeated pattern instead of using .repeat()
        const repeatedPattern = pattern.repeat(repetitions);

        if (repeatedPattern === numString) {
          repeated.push(i);
          break; // Found a repeating pattern, no need to check other lengths
        }
      }
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
  const invalidCodes = checkCodes(parsedPairs);

  const invalidCodeSum = invalidCodes.reduce(
    (sum, code) => sum + Number(code),
    0
  );
  console.log(`Sum of invalid codes: ${invalidCodeSum}`);
};

await main();

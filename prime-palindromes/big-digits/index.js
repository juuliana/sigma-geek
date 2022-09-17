import { writeFile, readFile } from "fs";

let palindromes = [];

const VALID_NUMBERS = [1, 3, 7, 9]; //Odd numbers and not divisible

const isStringPalindrome = (numberInString) => {
  const newString = numberInString.split("").reverse().join("");
  return numberInString === newString;
};

function validateNumber(piString) {
  const firstNumber = Number(piString.slice(0, 1));
  const lastNumber = Number(piString.slice(-1));

  if (firstNumber !== lastNumber) return false;

  const isValid = VALID_NUMBERS.includes(firstNumber);

  return isValid;
}

function decrementNumbers(PI, lengthPI) {
  for (let last = lengthPI; last > 20; last--) {
    for (let first = 0; first < lengthPI; first++) {
      const string = PI.slice(first, last);

      if (string.length > 21 && string.length < 100000) {
        const isValid = validateNumber(string);

        if (isValid) {
          const isPalindrome = isStringPalindrome(string);

          if (isPalindrome) {
            palindromes.push(string);
            return {
              first,
              last,
            };
          }
        }
      }

      console.log(first, "---", last);
    }
  }

  return;
}

function getPalindromes(PI) {
  const lengthPI = PI.length;

  const positions = decrementNumbers(PI, lengthPI);

  const result = `Palindromes: ${palindromes} - First position: ${positions?.first} - Last position: ${positions?.last}`;
  console.log("---------------- FINISH ------------------", result);

  writeFile(`big-digit.txt`, result, (err) => {
    if (err) throw err;
    return;
  });

  return;
}

// index
readFile("1000000.json", (err, data) => {
  if (err) throw err;
  getPalindromes(data.toString());
});

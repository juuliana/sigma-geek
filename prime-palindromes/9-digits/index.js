let primePalindromes = [];

function getPi() {
  let index = 1n;
  let x = 3n * 10n ** 130000n;

  let pi = x;

  while (x > 0) {
    x = (x * index) / ((index + 1n) * 4n);
    pi += x / (index + 2n);
    index += 2n;
  }

  return String(pi);
}

function getPalindromes() {
  let palindromes = [];

  const PI = getPi();

  for (let i = 0; i < PI.length; i++) {
    const endNumber = i + 9;
    const string = PI.slice(i, endNumber);

    const isPalindrome = isStringPalindrome(string);

    if (isPalindrome) {
      console.log("position", i);
      palindromes.push(string);
    }
  }

  return palindromes;
}

const isStringPalindrome = (numberInString) => {
  const newString = numberInString.split("").reverse().join("");

  return numberInString === newString;
};

function getPrimePalindromes(number) {
  let divisor = 2;
  while (number % divisor != 0) divisor++;

  if (number == divisor) primePalindromes.push(number);
}

//index
const palindromes = getPalindromes();
palindromes.map((number) => getPrimePalindromes(Number(number)));

console.log("First prime palindrome:", primePalindromes[0]);

import fetch from "node-fetch";

let primePalindromes = [];
let startNumber = 140672630000; //position near to the result

async function reconnect() {
  console.log("reconnecting");
  await getPalindromes();
}

async function getPi() {
  try {
    const url = `https://api.pi.delivery/v1/pi?start=${startNumber}&numberOfDigits=1000`;
    const response = await fetch(url);
    const app = await response.json();

    return app.content;
  } catch (error) {
    setTimeout(() => {
      reconnect();
    }, 10000);
  }
}

async function getPalindromes() {
  try {
    let palindromes = [];

    const PI = await getPi();

    for (let i = 0; i < PI.length; i++) {
      const endNumber = i + 21;
      const string = PI.slice(i, endNumber);

      const isPalindrome = isStringPalindrome(string);

      const has21digits = string.length === 21;

      if (isPalindrome && has21digits) {
        palindromes.push(string);
      }
    }

    return palindromes;
  } catch (err) {
    setTimeout(() => {
      reconnect();
    }, 20000);
  }
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
async function get() {
  const palindromes = await getPalindromes();

  while (palindromes.length <= 0) {
    startNumber += 975;
    await getPalindromes();
  }

  palindromes.map((number) => getPrimePalindromes(Number(number)));

  console.log(
    "First palindrome with 21 digits:",
    palindromes,
    primePalindromes
  );
}

get();

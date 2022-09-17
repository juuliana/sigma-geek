import express from "express";
import { getBigPalindrome } from "./prime-palindromes/big-digits/index.js";

const app = express();
app.use(express.json());

app.get("/", (_, res) => res.send(getBigPalindrome()));

app.listen(3000, () => console.log(`Is running`));

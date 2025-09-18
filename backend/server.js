import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// load wordlists
const wordlistEn = fs.readFileSync("words_alpha.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

const wordlistId = fs.readFileSync("words_id.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

const wordlistJp = fs.readFileSync("words_jp.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

const wordlistFr = fs.readFileSync("words_fr.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

const wordlistIt = fs.readFileSync("words_it.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

const wordlistDe = fs.readFileSync("words_de.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

// endpoint generate kata
app.post("/generate", (req, res) => {
    const { chars, maxAlphabet = 10, maxWords = 10, language = "en" } = req.body;

    if (!chars) {
        return res.status(400).json({ error: "Chars is required" });
    }

    // pilih wordlist sesuai language
    let wordlist;
    if (language === "id") {
        wordlist = wordlistId;
    }
    else if (language === "jp") {
        wordlist = wordlistJp;
    } 
    else if (language === "fr") {
        wordlist = wordlistFr;
    } 
    else if (language === "it") {
        wordlist = wordlistIt;
    } 
    else if (language === "de") {
        wordlist = wordlistDe;
    } 
    else {
        wordlist = wordlistEn;
    }

    const letters = chars.toLowerCase().split("");

    // filter: kata harus mengandung semua huruf input
    const filtered = wordlist.filter(word => {
    if (word.length > maxAlphabet) return false;
        for (let ch of letters) {
            if (!word.includes(ch)) return false;
        }
    return true;
    }
);

// ambil sejumlah maxWords (acak)
const result = filtered
.sort(() => Math.random() - 0.5)
.slice(0, maxWords);

res.json({ result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

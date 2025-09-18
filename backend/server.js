import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// load wordlist 
const wordlist = fs.readFileSync("words_alpha.txt", "utf-8")
  .split("\n")
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

// endpoint word
app.post("/generate", (req, res) => {
    const { chars, maxAlphabet = 10, maxWords = 10 } = req.body;

    if (!chars) {
        return res.status(400).json({ error: "Chars is required" });
    }

    const letters = chars.toLowerCase().split("");

    // filter
    const filtered = wordlist.filter(word => {
        if (word.length > maxAlphabet) return false;

    // alphabet must be contained in a word
    for (let ch of letters) {
        if (!word.includes(ch)) return false;
    }
    return true;
    });

    const result = filtered.sort(() => Math.random() - 0.5).slice(0, maxWords);

    res.json({ result });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

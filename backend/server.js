import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Tambahan untuk ES Modules

const __filename = fileURLToPath(import.meta.url); // Tambahan untuk ES Modules
const __dirname = path.dirname(__filename);      // Tambahan untuk ES Modules

const app = express();
app.use(cors());
app.use(express.json());

// load wordlists
const wordlistEn = fs.readFileSync("words_en.txt", "utf-8")
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


app.get("/dictionary/:lang", (req, res) => {
  const { lang } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 101;
  const filePath = path.join(__dirname, `words_${lang}.txt`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Dictionary not found" });
  }

  const words = fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .map((w) => w.trim())
    .filter(Boolean);

  // ambil slice sesuai page
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = words.slice(start, end);

  res.json({
    page: parseInt(page),
    total: words.length,
    hasMore: end < words.length,
    data: paginated
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

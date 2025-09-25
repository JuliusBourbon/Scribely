import express from "express";
import cors from "cors";
import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Object Cache
const wordlistsCache = {};

// Object Cache Helper function
async function getWordlist(language) {
    if (wordlistsCache[language]) {
        return wordlistsCache[language];
    }

    const filePath = path.join(__dirname, `words_${language}.txt`);
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const wordlist = data
            .split(/\r?\n/)
            .map(w => w.trim().toLowerCase())
            .filter(Boolean);

        wordlistsCache[language] = wordlist;
        return wordlist;
    } catch (error) {
        console.error(`Could not load wordlist for language: ${language}`, error);
        return null;
    }
}


// wordit page Endpoint
app.post("/generate", async (req, res) => {
    const { chars, maxAlphabet = 10, maxWords = 10, language = "en" } = req.body;

    if (!chars) {
        return res.status(400).json({ error: "Chars is required" });
    }

    // Ambil data dari function helper
    const wordlist = await getWordlist(language);
    if (!wordlist) {
        return res.status(404).json({ error: `Wordlist for language '${language}' not found.` });
    }

    const letters = chars.toLowerCase().split("");

    const filtered = wordlist.filter(word => {
        if (word.length > maxAlphabet) return false;
        for (let ch of letters) {
            if (!word.includes(ch)) return false;
        }
        return true;
    });

    const result = filtered
        .sort(() => Math.random() - 0.5)
        .slice(0, maxWords);

    res.json({ result });
});


// Dictionary Endpoint
app.get('/api/words', async (req, res) => {
    const { lang, letter } = req.query;

    if (!lang || !letter) {
        return res.status(400).json({ error: 'Language (lang) and letter parameters are required.' });
    }
    
    // Ambil data dari function helper
    const words = await getWordlist(lang);
    if (!words) {
        return res.status(404).json({ error: `Dictionary file for language '${lang}' not found.` });
    }

    const filteredWords = words.filter(
        word => word.trim().charAt(0).toUpperCase() === letter.toUpperCase()
    );

    res.json(filteredWords);
});


// Wordle Endpoint
app.post('/api/find-words', async (req, res) => {
    const { maxChar = 5, maxWord = 10, language = 'en', pattern, excludes = '' } = req.body;

    if (!pattern) {
        return res.status(400).json({ error: 'Pattern is required.' });
    }

    // Ambil data dari function helper
    const allWords = await getWordlist(language);
    if (!allWords) {
        return res.status(404).json({ error: `Word list for language '${language}' not found.` });
    }

    try {
        const regex = new RegExp(`^${pattern.replace(/_/g, '.')}$`, 'i');
        
        const filteredWords = allWords.filter(word => {
            if (word.length !== maxChar || !regex.test(word)) {
                return false;
            }

            // Filter Excluded character
            if (excludes.length > 0) {
                for (const char of excludes) {
                    if (word.includes(char)) {
                        return false;
                    }
                }
            }
            return true;
        });

        const results = filteredWords
            .sort(() => Math.random() - 0.5)
            .slice(0, maxWord);

        const finalResults = results.map(word => word.toUpperCase());
        
        res.json(finalResults);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred during pattern matching.' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
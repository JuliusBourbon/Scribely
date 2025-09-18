import { useState, useEffect } from "react";

export default function WordIt() {
    const [chars, setChars] = useState("");
    const [maxAlphabet, setMaxAlphabet] = useState(10);
    const [maxWords, setMaxWords] = useState(10);
    const [result, setResult] = useState([]);

    // Randomize bg-color and text-color
    const colors = [
        { bg: "bg-[#0A1A6E]", text: "text-[#8D9DE8]" },
        { bg: "bg-[#FF1000]", text: "text-[#FFABA6]" },
        { bg: "bg-[#1D987C]", text: "text-[#A1E07C]" },
        { bg: "bg-[#FF599A]", text: "text-[#FAD1E1]" },
        { bg: "bg-[#FF5C00]", text: "text-[#FFC19E]" },
        { bg: "bg-[#7F68FF]", text: "text-[#E8E4FF]" },
        { bg: "bg-[#1A5EDB]", text: "text-[#AADDE1]" },
    ];

    // fetch
    const fetchWords = async (c, a, w) => {
        if (!c) {
            setResult([]);
            return;
        }
        const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chars: c, maxAlphabet: a, maxWords: w }),
        });
        const data = await res.json();
        setResult(data.result);
    };

    // Hook
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchWords(chars, maxAlphabet, maxWords);
            }, 400); // debounce
            return () => clearTimeout(delay);
    }, [chars, maxAlphabet, maxWords]);

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex text-[#0A1A6E] text-2xl my-15 font-medium items-center justify-center">
                <h1>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt</h1>
            </div>

            <div className="flex flex-col justify-center mx-50 gap-10">
                <div className="mx-50">
                    <h1>Character</h1>
                    <div className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                        <input
                            value={chars}
                            onChange={(e) => setChars(e.target.value)}
                            placeholder="Example: cks"
                            className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"
                        />
                    </div>
                </div>
                <div className="mx-50">
                    <div className="flex justify-around">
                        <div className="w-full mx-30">
                            <h1>Max. Alphabet</h1>
                            <div className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                                <input
                                    type="number"
                                    value={maxAlphabet}
                                    onChange={(e) => setMaxAlphabet(Number(e.target.value))}
                                    placeholder="Default: 10"
                                    className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"
                                />
                            </div>
                        </div>
                        <div className="w-full mx-30">
                            <h1>Max. Words</h1>
                            <div className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                                <input
                                    type="number"
                                    value={maxWords}
                                    onChange={(e) => setMaxWords(Number(e.target.value))}
                                    placeholder="Default: 10"
                                    className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full h-full gap-10">
                    <h1 className="text-3xl font-medium text-[#0A1A6E]">Result</h1>
                    <div className="flex flex-wrap gap-5 justify-around mx-50">
                        {result.map((word, i) => {
                            const color = colors[Math.floor(Math.random() * colors.length)];

                            return (
                            <div key={i} className={`${color.bg} px-5 py-1 rounded-full`}>
                                <h1 className={`text-2xl ${color.text}`}>{word}</h1>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
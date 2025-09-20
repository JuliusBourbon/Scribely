import { useState, useEffect } from "react";
import React from "react";
import Select from 'react-select';

export default function WordIt() {
    const [chars, setChars] = useState("");
    const [maxAlphabet, setMaxAlphabet] = useState(10);
    const [maxWords, setMaxWords] = useState(10);
    const [language, setLanguage] = useState("en");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [none, setNone] = useState(false);
    const [wordColors, setWordColors] = useState([]);

    const options = [
        { value: 'en', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg" alt="UK" width="20" className="inline mr-2"/> English</span> },
        { value: 'id', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1e9.svg" alt="ID" width="20" className="inline mr-2"/> Indonesia</span> },
        { value: 'fr', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1eb-1f1f7.svg" alt="FR" width="20" className="inline mr-2"/> French</span> },
        { value: 'it', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1f9.svg" alt="IT" width="20" className="inline mr-2"/> Italy</span> },
        { value: 'jp', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ef-1f1f5.svg" alt="JP" width="20" className="inline mr-2"/> Japan</span> },
        { value: 'de', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1e9-1f1ea.svg" alt="DE" width="20" className="inline mr-2"/> Germany</span> },
    ];

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
    const fetchWords = async (c, a, w, lang) => {
        setLoading(true); 
        setNone(false);
        setError(null); 
        if (!c) {
            setResult([]);
            setNone(true);
            return;
        }
        try{
            const res = await fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chars: c, maxAlphabet: a, maxWords: w, language: lang }),
            });
            const data = await res.json();
            setResult(data.result);

        } catch (error) {
            console.error('Failed to fetch words: ', error);
            setError("Failed to fetch Dictionary. Please Try Again.");
            setResult([]);
        } finally {
            setLoading(false);
            setNone(false);
        }
    };

    // Hook
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchWords(chars, maxAlphabet, maxWords, language);
            }, 400); // debounce
            return () => clearTimeout(delay);
    }, [chars, maxAlphabet, maxWords, language]);

    useEffect(() => {
        if (result.length > 0) {
            // Generate warna baru tiap kali result berubah
            const newColors = result.map(() => {
                return colors[Math.floor(Math.random() * colors.length)];
            });
            setWordColors(newColors);
        }
    }, [result]);

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex text-[#0A1A6E] text-2xl my-15 font-medium items-center justify-center">
                <h1>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt</h1>
            </div>

            <div className="flex flex-col justify-center mx-50 gap-10">
                <div className="mx-50 flex justify-between gap-10">
                    <div className="w-3/4">
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
                    <div className="w-1/4">
                        <h1>Language</h1>
                        <Select
                            value={options.find((opt) => opt.value === language)}
                            onChange={(opt) => setLanguage(opt.value)}
                            options={options}
                            styles={{
                                control: (base) => ({
                                ...base,
                                backgroundColor: "rgba(255, 255, 255, 0.36)",
                                border: "1px solid #C77A00",
                                borderRadius: "1rem",
                                boxShadow: "inset 0 1px 3px #C77A00",
                                }),
                                menu: (base) => ({
                                ...base,
                                backgroundColor: "rgba(255, 255, 255, 0.36)",
                                backdropFilter: "blur(6px)",
                                }),
                                option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                    ? "rgba(199, 122, 0, 0.3)" 
                                    : "transparent",
                                color: "#000",
                                }),
                                singleValue: (base) => ({
                                ...base,
                                color: "#000",
                                }),
                                placeholder: (base) => ({
                                ...base,
                                color: "#555",
                                }),
                            }}
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
                        {none &&
                            <div className="text-white text-3xl">
                                <h1>
                                    Enter the Character first!
                                </h1>
                            </div>
                        }
                        {loading && !none &&
                            <div className='flex flex-col items-center justify-center text-3xl gap-10'>
                                <div
                                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-[#0A1A6E]"
                                    role="status">
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        >Loading...</span
                                    >
                                </div>
                                <h1>Loading...</h1>
                            </div>
                        }
                        {error && <p className="text-red-500 text-center text-3xl">{error}</p>}
                        {!loading && !error && (
                            <div className="flex flex-wrap gap-5 justify-around mx-50">
                                {result.map((word, i) => {
                                    const color = wordColors[i] || colors[0];
                                    // const delay = setTimeout(() => {
                                    //     color, 1000;
                                    //     return () => clearTimeout(delay);
                                    // }, [color])
                                    return (
                                    <div key={i} className={`${color.bg} px-5 py-1 rounded-full`}>
                                        <h1 className={`text-2xl ${color.text}`}>{word}</h1>
                                    </div>
                                    );
                                })}
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}
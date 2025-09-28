import Select from 'react-select';
import { useRef, useState, useEffect } from "react";

export default function Wordle() {
    const [maxChar, setMaxChar] = useState(5);
    const [maxWord, setMaxWord] = useState(10);
    const [language, setLanguage] = useState("en");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 
    const [hasSearched, setHasSearched] = useState(false);
    const [excludes, setExcludes] = useState('');
    const [inputValues, setInputValues] = useState(Array(5).fill(''));
    const inputs = useRef([]);
    const [wordColors, setWordColors] = useState([]);
    const isSmallScreen = useMediaQuery('(max-width: 640px)');
    const maxCols = isSmallScreen ? 6 : 8;
    const columnCount = Math.min(maxChar, maxCols);

    function useMediaQuery(query) {
        const [matches, setMatches] = useState(false);

        useEffect(() => {
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                setMatches(media.matches);
            }
            const listener = () => {
                setMatches(media.matches);
            };
            // Cek perubahan ukuran layar
            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
        }, [matches, query]);

        return matches;
    }

    const handleChange = (e, idx) => {
        const newValues = [...inputValues];
        newValues[idx] = e.target.value.toUpperCase();
        setInputValues(newValues);

        if (e.target.value.length === 1 && idx < maxChar - 1) {
            inputs.current[idx + 1].focus();
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !e.target.value && idx > 0) {
            inputs.current[idx - 1].focus();
        }
    };

    const options = [
        { value: 'en', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg" alt="UK" width="20" className="inline mr-2"/> English</span> },
        { value: 'id', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1e9.svg" alt="ID" width="20" className="inline mr-2"/> Indonesia</span> },
        { value: 'fr', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1eb-1f1f7.svg" alt="FR" width="20" className="inline mr-2"/> French</span> },
        { value: 'it', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1f9.svg" alt="IT" width="20" className="inline mr-2"/> Italy</span> },
        { value: 'jp', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ef-1f1f5.svg" alt="JP" width="20" className="inline mr-2"/> Japan</span> },
        { value: 'de', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1e9-1f1ea.svg" alt="DE" width="20" className="inline mr-2"/> Germany</span> },
    ];
    const colors = [
        { bg: "bg-[#0A1A6E]", text: "text-[#8D9DE8]" },
        { bg: "bg-[#FF1000]", text: "text-[#FFABA6]" },
        { bg: "bg-[#1D987C]", text: "text-[#A1E07C]" },
        { bg: "bg-[#FF599A]", text: "text-[#FAD1E1]" },
        { bg: "bg-[#FF5C00]", text: "text-[#FFC19E]" },
        { bg: "bg-[#7F68FF]", text: "text-[#E8E4FF]" },
        { bg: "bg-[#1A5EDB]", text: "text-[#AADDE1]" },
    ];

    useEffect(() => {
        inputs.current = inputs.current.slice(0, maxChar);
        setInputValues(currentValues => {
            const newValues = Array(maxChar).fill('');
            currentValues.slice(0, maxChar).forEach((val, i) => {
                newValues[i] = val;
            });
            return newValues;
        });
    }, [maxChar]);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        setHasSearched(true);

        const pattern = inputValues.map(val => val.trim() || '_').join('');

        try {
            const response = await fetch('/api/find-words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    maxChar: Number(maxChar),
                    maxWord: Number(maxWord),
                    language: language,
                    pattern: pattern,
                    excludes: excludes,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Something went wrong');
            setResults(data);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValues.some(val => val !== '') || hasSearched) {
                handleSearch();
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValues, maxChar, maxWord, language, excludes, hasSearched]);


    useEffect(() => {
        if (results.length > 0) {
            const newColors = results.map(() => colors[Math.floor(Math.random() * colors.length)]);
            setWordColors(newColors);
        }
    }, [results]);

    useEffect(() => {
        if (results.length > 0) {
            const newColors = results.map(() => {
                return colors[Math.floor(Math.random() * colors.length)];
            });
            setWordColors(newColors);
        }
    }, [results]);

    return (
        <div className="flex flex-col w-full py-10">
            <div className="text-[#0A1A6E] text-2xl mx-20 md:mx-50 text-justify md:text-center mb-20 font-medium px-4">
                <h1>
                    Got a <span className='text-[#FF1000]'>Puzzle</span> to solve? Enter the letters you know, leave the blanks where you don’t, 
                    and Wordle will help you uncover the right match. You can also set the Maximum of Character, Result and even add an Excludes Character
                </h1>
            </div>

            <div className="flex flex-col justify-center mx-auto max-w-4xl w-full gap-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 mx-20 md:mx-0 gap-6">
                    <div>
                        <h1 className='text-center mb-1'>Max. Alphabet</h1>
                        <div className="relative rounded-2xl py-2 px-3 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                            <input
                                type="number"
                                value={maxChar}
                                onChange={(e) => setMaxChar(Number(e.target.value))}
                                placeholder="Default: 5"
                                className="bg-transparent outline-none text-gray-900 w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-center mb-1'>Max. Words</h1>
                        <div className="relative rounded-2xl py-2 px-3 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                            <input
                                type="number"
                                value={maxWord}
                                onChange={(e) => setMaxWord(Number(e.target.value))}
                                placeholder="Default: 10"
                                className="bg-transparent outline-none text-gray-900 w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row mx-20 md:mx-0 justify-between md:gap-20 gap-10">
                    <div className='w-full'>
                        <h1 className='text-center mb-1'>Excludes Character</h1>
                        <div className="relative rounded-2xl py-2 px-3 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                            <input
                                type="text"
                                value={excludes}
                                onChange={(e) => setExcludes(e.target.value.toLowerCase())}
                                placeholder="Example: bhpd"
                                className="bg-transparent outline-none text-gray-900 w-full"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <h1 className='text-center mb-1'>Language</h1>
                        <Select
                            value={options.find((opt) => opt.value === language)}
                            onChange={(opt) => setLanguage(opt ? opt.value : "en")}
                            options={options}
                            styles={{
                                control: (base) => ({ ...base, backgroundColor: "rgba(255, 255, 255, 0.36)", border: "1px solid #C77A00", borderRadius: "1rem", boxShadow: "inset 0 1px 3px #C77A00", width: 'w-full' }),
                                menu: (base) => ({ ...base, backgroundColor: "rgba(255, 255, 255, 0.36)", backdropFilter: "blur(6px)" }),
                                option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "rgba(199, 122, 0, 0.3)" : "transparent", color: "#000" }),
                                singleValue: (base) => ({ ...base, color: "#000" }),
                            }}
                        />
                    </div>
                </div>

                <div className='mx-20 md:mx-0'>
                    <h1 className='text-center mb-1'>Character</h1>
                    <div className="grid gap-1 md:gap-4 justify-items-center" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
                        {Array.from({ length: maxChar }).map((_, i) => (
                            <div
                                key={i}
                                className="relative rounded-md py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full h-18 md:h-36"
                            >
                                <input
                                    type="text"
                                    maxLength="1"
                                    className="w-full h-3/4 md:h-full bg-transparent outline-none text-4xl md:text-5xl text-center uppercase"
                                    ref={(el) => (inputs.current[i] = el)}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col items-center w-full h-full gap-5 mt-5">
                    <h1 className="text-3xl font-medium text-[#0A1A6E]">Result</h1>
                    
                    {loading && (
                        <div className='flex flex-col items-center justify-center text-xl gap-4'>
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-[#0A1A6E]"
                                role="status"
                            ></div>
                            <h1>Loading...</h1>
                        </div>
                    )}

                    

                    {error && <p className="text-red-600 text-center text-2xl">{error}</p>}
                    
                    {!loading && !error && hasSearched && results.length === 0 && (
                        <h1 className="text-gray-500 text-2xl">Word not found.</h1>
                    )}

                    {!loading && !error && results.length > 0 && (
                        <div className="flex flex-wrap md:gap-5 gap-2 justify-around md:mx-0 mx-20">
                            {results.map((word, i) => {
                                const color = wordColors[i] || colors[0];
                                return(
                                    <div key={i} className={`${color.bg} md:px-5 px-2 py-1 rounded-full`}>
                                        <h1 className={`md:text-2xl text-xl ${color.text}`}>{word}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
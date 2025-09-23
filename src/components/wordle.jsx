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
    const inputs = useRef([]);
    const [wordColors, setWordColors] = useState([]);

    const handleChange = (e, idx) => {
        const value = e.target.value;
        if (value.length === 1 && idx < inputs.current.length - 1) {
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

    useEffect(() => {
        inputs.current = inputs.current.slice(0, maxChar);
    }, [maxChar]);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        setResults([]);
        setHasSearched(true);

        // Input pattern. Jika kosong menjadi '_'
        const pattern = inputs.current.map(input => input.value.trim() || '_').join('');

        // Fetch
        try {
            const response = await fetch('http://localhost:5000/api/find-words', {
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

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setResults(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (results.length > 0) {
            // Generate warna baru tiap kali result berubah
            const newColors = results.map(() => {
                return colors[Math.floor(Math.random() * colors.length)];
            });
            setWordColors(newColors);
        }
    }, [results]);

    return (
        <div className="flex flex-col h-screen w-full py-10">
            <div className="text-[#0A1A6E] text-2xl text-center mb-10 font-medium px-4">
                <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic quasi quam ipsam, voluptatem at magnam sit quisquam, neque ratione et vitae consequuntur deserunt ex unde temporibus voluptatibus. Repellat, ipsam rem!</h1>
            </div>

            <div className="flex flex-col justify-center mx-auto max-w-4xl w-full gap-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h1>Max. Alphabet</h1>
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
                        <h1>Max. Words</h1>
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

                <div className="flex justify-between gap-20">
                    <div className='w-full'>
                        <h1>Excludes Character</h1>
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
                        <h1>Language</h1>
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

                <div className="grid gap-4 justify-items-center" style={{ gridTemplateColumns: `repeat(${maxChar}, minmax(0, 1fr))` }}>
                    {Array.from({ length: maxChar }).map((_, i) => (
                        <div
                            key={i}
                            className="relative rounded-md py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full h-36"
                        >
                            <input
                                type="text"
                                maxLength="1"
                                className="w-full h-full bg-transparent outline-none text-5xl text-center uppercase"
                                ref={(el) => (inputs.current[i] = el)}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                            />
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-center">
                    <button 
                        onClick={handleSearch} 
                        className="bg-[#001D6E] text-white font-bold px-10 py-3 rounded-full shadow-lg hover:bg-[#0A1A6E] transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Mencari...' : 'Cari Kata'}
                    </button>
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
                        <div className="flex flex-wrap gap-4 justify-center max-w-3xl">
                            {results.map((word, i) => {
                                const color = wordColors[i] || colors[0];
                                return(
                                    <div key={i} className={`${color.bg} px-4 py-1 rounded-full`}>
                                        <h1 className={`text-xl font-semibold ${color.text}`}>{word}</h1>
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
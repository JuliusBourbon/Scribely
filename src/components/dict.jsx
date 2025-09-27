import Select from 'react-select';
import { useEffect, useState } from "react";

export default function Dict() {
    const options = [
        { value: 'en', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg" alt="UK" width="20" className="inline mr-2"/> English</span> },
        { value: 'id', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1e9.svg" alt="ID" width="20" className="inline mr-2"/> Indonesia</span> },
        { value: 'fr', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1eb-1f1f7.svg" alt="FR" width="20" className="inline mr-2"/> French</span> },
        { value: 'it', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1f9.svg" alt="IT" width="20" className="inline mr-2"/> Italy</span> },
        { value: 'jp', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ef-1f1f5.svg" alt="JP" width="20" className="inline mr-2"/> Japan</span> },
        { value: 'de', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1e9-1f1ea.svg" alt="DE" width="20" className="inline mr-2"/> Germany</span> },
    ];

    const [language, setLanguage] = useState('en');
    const [selectedLetter, setSelectedLetter] = useState('A');
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    useEffect(() => {
        const fetchWords = async () => {
            setLoading(true); 
            setError(null); 
            try {
                const response = await fetch(`http://localhost:5000/api/words?lang=${language}&letter=${selectedLetter}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWords(data);
            } catch (error) {
                console.error("Failed to fetch words:", error);
                setError("Failed to fetch Dictionary. Please Try Again.");
                setWords([]);
            } finally {
                setLoading(false); 
            }
        };

        fetchWords();
    }, [language, selectedLetter]);

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex text-[#0A1A6E] text-2xl mx-20 md:mx-50 text-justify md:text-center my-15 font-medium items-center justify-center">
                <h1>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt</h1>
            </div>

            <div className="flex justify-center md:justify-end mx-20">
                <Select
                    value={options.find((opt) => opt.value === language)}
                    onChange={(opt) => {
                        setLanguage(opt.value);
                        setSelectedLetter('A'); 
                    }}
                    options={options}
                    styles={{
                        control: (base) => ({ ...base, backgroundColor: "rgba(255, 255, 255, 0.36)", border: "1px solid #C77A00", borderRadius: "1rem", boxShadow: "inset 0 1px 3px #C77A00", width: '200px' }),
                        menu: (base) => ({ ...base, backgroundColor: "rgba(255, 255, 255, 0.36)", backdropFilter: "blur(6px)" }),
                        option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "rgba(199, 122, 0, 0.3)" : "transparent", color: "#000" }),
                        singleValue: (base) => ({ ...base, color: "#000" }),
                    }}
                />  
            </div>

            <div className="flex flex-wrap justify-around md:justify-center gap-2 mx-20">
                {alphabet.map(letter => (
                    <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`w-10 h-10 rounded-md font-bold transition-colors cursor-pointer ${
                            selectedLetter === letter 
                            ? 'bg-[#0A1A6E] text-white' 
                            : 'bg-white/50 text-[#0A1A6E] hover:bg-[#C77A00]/50'
                        }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            
            <div className="mx-20 bg-white/30 p-5 rounded-lg text-[#0A1A6E] flex-grow">
                <h1 className="text-3xl font-bold mb-4 text-center">{selectedLetter}</h1>
                {loading &&
                    <div className='flex flex-col items-center justify-center text-3xl gap-10'>
                        <div
                            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-[#0A1A6E]"
                            role="status">
                            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                        <h1>Loading...</h1>
                    </div>
                }
                {error && <p className="text-red-500 text-center text-3xl">{error}</p>}
                {!loading && !error && (
                     <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 md:gap-3 mt-3">
                        {words.length > 0 ? (
                            words.map((word, index) => (
                                <div key={index} className="bg-white/50 rounded-md break-words text-center p-2 shadow font-medium text-sm">
                                    {word}
                                </div>
                            ))
                        ) : (
                            <p>Words starting with '{selectedLetter}' is not Found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
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

    const [language, setLanguage] = useState("en");
    const [dictionary, setDictionary] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        // reset kalau ganti bahasa
        setDictionary([]);
        setPage(1);
        setHasMore(true);
        loadWords(1, language);
    }, [language]);

    const loadWords = async (pageNum, lang) => {
        try {
        const res = await fetch(
            `http://localhost:5000/dictionary/${lang}?page=${pageNum}&limit=50`
        );
        const data = await res.json();
        setDictionary((prev) => [...prev, ...data.data]); // append data
        setHasMore(data.hasMore);
        } catch (err) {
        console.error(err);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadWords(nextPage, language);
    };

    return (
        <div className="flex flex-col h-screen w-full gap-5">
            <div className="flex text-[#0A1A6E] text-2xl my-15 font-medium items-center justify-center">
                <h1>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt</h1>
            </div>

            <div className="flex justify-end mx-20">
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
            
            <div className="mx-20 bg-white/30 p-5 rounded-lg text-[#0A1A6E]">
                <h1 className="text-xl font-bold">Dictionary ({language})</h1>
                <div className="grid grid-cols-8 gap-3 mt-3">
                    {dictionary.map((word, idx) => (
                    <div key={idx} className="bg-white/50 rounded-md text-center p-2">
                        {word}
                    </div>
                    ))}
                </div>
                {hasMore && (
                    <div className="flex justify-center mt-5">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-[#C77A00] text-white rounded-lg hover:bg-[#a56400]"
                    >
                        Load More
                    </button>
                    </div>
                )}
            </div>
        </div>
    )
}
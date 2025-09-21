import Select from 'react-select';
import { useRef } from "react";

export default function Wordle() {

    const inputs = useRef([]);

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
        }
        

    const options = [
        { value: 'en', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg" alt="UK" width="20" className="inline mr-2"/> English</span> },
        { value: 'id', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1e9.svg" alt="ID" width="20" className="inline mr-2"/> Indonesia</span> },
        { value: 'fr', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1eb-1f1f7.svg" alt="FR" width="20" className="inline mr-2"/> French</span> },
        { value: 'it', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1f9.svg" alt="IT" width="20" className="inline mr-2"/> Italy</span> },
        { value: 'jp', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1ef-1f1f5.svg" alt="JP" width="20" className="inline mr-2"/> Japan</span> },
        { value: 'de', label: <span><img src="https://twemoji.maxcdn.com/v/latest/svg/1f1e9-1f1ea.svg" alt="DE" width="20" className="inline mr-2"/> Germany</span> },
    ];

    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex text-[#0A1A6E] text-2xl my-15 font-medium items-center justify-center">
                <h1>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt</h1>
            </div>

            <div className="flex flex-col justify-center mx-50 gap-10">
                <div className="mx-50">
                    <div className="flex justify-around">
                        <div className="w-full mx-30">
                            <h1>Max. Alphabet</h1>
                            <div className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                                <input
                                    type="number"
                                    // value={maxAlphabet}
                                    // onChange={(e) => setMaxAlphabet(Number(e.target.value))}
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
                                    // value={maxWords}
                                    // onChange={(e) => setMaxWords(Number(e.target.value))}
                                    placeholder="Default: 10"
                                    className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-25 flex gap-10 items-center justify-end">
                    <div className="w-1/4">
                        <h1>Language</h1>
                        <Select
                            // value={options.find((opt) => opt.value === language)}
                            // onChange={(opt) => setLanguage(opt.value)}
                            options={options}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "rgba(255, 255, 255, 0.36)",
                                    border: "1px #C77A00",
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

                <div className="grid grid-cols-5 gap-4 mx-25">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                        key={i}
                        className="relative rounded-md py-10 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-[80%]"
                        >
                        <input
                            type="text"
                            maxLength="1"
                            className="w-full mx-5 bg-transparent outline-none text-9xl text-center"
                            ref={(el) => (inputs.current[i] = el)}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                        />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center w-full h-full gap-10">
                    <h1 className="text-3xl font-medium text-[#0A1A6E]">Result</h1>
                    {/* {none &&
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
                    )} */}
                </div>
            </div>
        </div>
    )
}
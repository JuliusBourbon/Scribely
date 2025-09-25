import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

export default function LandingPage(){
    const myFourSides = [
        "Hello World",
        "Halo Dunia",
        "Konnichiwa Sekai",
        "Nǐ hǎo shìjiè",
        "Annyeonghaseyo segye",
        "Bonjour le monde",
        "Hallo Welt",
        "Ciao mondo",
        "Hola mundo",
        "Privet mir",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % myFourSides.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    return(
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
            <div className="flex flex-col md:flex-row w-full max-w-7xl flex-grow">
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left md:items-start py-10 md:py-0">
                    <h1 className="text-4xl sm:text-5xl w-[70%] md:w-[80%] font-bold text-white">
                        Find Your Word!
                    </h1>
                    <h1 key={currentIndex} className="text-4xl sm:text-5xl w-[70%] md:w-[80%] text-[#FF1000] font-bold animate-pop-up">
                        {myFourSides[currentIndex]}
                    </h1>
                    <h1 className="text-4xl sm:text-5xl w-[70%] md:w-[55%] font-bold text-[#0A1A6E] mb-10">
                        Unravel letters, spark words, ignite learning.
                    </h1>
                    <div className="w-full flex justify-center md:justify-start md:w-1/2">
                        <NavLink to='/wordit' className="flex items-center justify-between text-xl sm:text-2xl py-2 px-4 bg-[#0A1A6E] rounded-full w-[80%] sm:w-1/2 text-white transition-all font-medium hover:translate-y-1.5 hover:bg-[#0A1A6E]/90">
                            <h1 className="ml-5">Start</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-5 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </NavLink>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-5 py-10 md:py-0">
                    <div className="flex gap-8 sm:gap-12 md:gap-20 text-2xl sm:text-3xl font-bold text-white my-5 md:my-10">
                        <h1 className="-rotate-30 text-[#7F68FF]">Hello</h1>
                        <h1 className="-rotate-10 text-[#0A1A6E]">Bonjour</h1>
                        <h1 className="rotate-40 text-[#FF1000]">Guten Morgen</h1>
                    </div>
                    <h1 className="text-center text-4xl sm:text-5xl w-3/4 md:w-1/2 font-medium text-white">
                        <span className="font-black">50K+</span><br /> Vocabularies
                    </h1>
                    <h1 className="text-center text-4xl sm:text-5xl w-3/4 md:w-1/2 font-medium text-white">
                        <span className="font-black">6+</span><br /> Language
                    </h1>
                    <div className="flex gap-8 sm:gap-12 md:gap-20 text-2xl sm:text-3xl font-bold text-white my-5 md:my-10">
                        <h1 className="rotate-30 text-[#1D987C]">Selamat Pagi</h1>
                        <h1 className="rotate-10 text-[#FF1000]">Konnichiwa</h1>
                        <h1 className="-rotate-35 text-[#7F68FF]">Hola</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 sm:gap-x-12 md:gap-x-20 text-lg sm:text-xl md:text-2xl font-semibold text-[#0A1A6E] my-10 px-4">
                <h1>Indonesia</h1>
                <h1>English</h1>
                <h1>French</h1>
                <h1>Italy</h1>
                <h1>Japan</h1>
                <h1>Germany</h1>
            </div>
        </div>
    )
}
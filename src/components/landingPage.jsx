export default function LandingPage(){
    return(
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="flex h-full">
                <div className="w-1/2 flex flex-col items-center justify-center gap-10">
                    <h1 className="text-5xl w-1/2 font-bold text-[#0A1A6E]">
                        <span className="text-white">Find Your Word!</span> <br/>
                        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                    </h1>
                    <div className="w-1/2">
                        <div className="flex items-center justify-between text-2xl py-1 bg-[#0A1A6E] rounded-full w-1/2 text-white font-medium">
                            <h1 className="ml-5">Start</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-5 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center gap-5">
                    <div className="flex gap-20 text-3xl font-bold text-white my-10">
                        <h1 className="-rotate-30 text-[#7F68FF]">Hello</h1>
                        <h1 className="-rotate-10 text-[#0A1A6E]">Bonjour</h1>
                        <h1 className="rotate-40 text-[#FF1000]">Hola</h1>
                    </div>
                    <h1 className="text-center text-5xl w-1/2 font-medium text-white">
                        <span className="font-black">20K+</span><br /> Vocabularies
                    </h1>
                    <h1 className="text-center text-5xl w-1/2 font-medium text-white">
                        <span className="font-black">10+</span><br /> Language
                    </h1>
                    <div className="flex gap-20 text-3xl font-bold text-white my-10">
                        <h1 className="rotate-30 text-[#1D987C]">Namaste</h1>
                        <h1 className="rotate-10 text-[#FF1000]">Konnichiwa</h1>
                        <h1 className="-rotate-35 text-[#7F68FF]">Ni Hao</h1>
                    </div>
                </div>
            </div>
            <div className="flex gap-60 text-2xl font-semibold max-h-full my-10 text-[#0A1A6E]">
                <h1>Indonesia</h1>
                <h1>English</h1>
                <h1>Franch</h1>
                <h1>Italy</h1>
                <h1>Japan</h1>
                <h1>Chinese</h1>
            </div>
        </div>
    )
}
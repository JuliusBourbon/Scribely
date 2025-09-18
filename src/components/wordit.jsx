export default function WortIt() {
    return (
        <div className="flex flex-col h-screen w-full">
            <div className="flex text-[#0A1A6E] text-2xl my-15 font-medium items-center justify-center">
                <h1>lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt</h1>
            </div>

            <div className="flex flex-col justify-center mx-50 gap-10">
                <div className="mx-50">
                    <h1>Character</h1>
                    <form id="char-input" className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                        <input name="char" placeholder="Example: cks" className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"/>
                    </form>
                </div>
                <div className="mx-50">
                    <div className="flex justify-around">
                        <div className="w-full mx-30">
                            <h1>Max. Alphabet</h1>
                            <form id="max-alp" className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                                <input name="alp" type="number" placeholder="Default: 10" className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"/>
                            </form>
                        </div>
                        <div className="w-full mx-30">
                            <h1>Max. Words</h1>
                            <form id="max-words" className="relative rounded-2xl py-2 inset-shadow-sm inset-shadow-[#C77A00] flex items-center bg-white/30 w-full">
                                <input name="words" type="number" placeholder="Default: 10" className="mx-5 bg-transparent outline-none text-gray-900 w-full resize-none"/>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full h-full gap-10">
                    <h1 className="text-3xl font-medium text-[#0A1A6E]">Result</h1>
                    <div className="flex flex-wrap gap-5 justify-around mx-50">
                        <div className="bg-[#0A1A6E] px-5 py-1 rounded-full">
                            <h1 className=" text-2xl text-[#8D9DE8]">Windsocks</h1>
                        </div>
                        <div className="bg-[#0A1A6E] px-5 py-1 rounded-full">
                            <h1 className=" text-2xl text-[#8D9DE8]">Jacks</h1>
                        </div>
                        <div className="bg-[#0A1A6E] px-5 py-1 rounded-full">
                            <h1 className=" text-2xl text-[#8D9DE8]">Mudrocks</h1>
                        </div>
                        <div className="bg-[#0A1A6E] px-5 py-1 rounded-full">
                            <h1 className=" text-2xl text-[#8D9DE8]">Hacksaws</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
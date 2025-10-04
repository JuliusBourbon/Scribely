const Footer = () => {
    return (
        <footer className="bg-[#0A1A6E] text-white pt-10 pb-4 mt-25">
            <div className="container mx-auto px-6 sm:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-3xl font-extrabold text-[#FF1000]">Scribely</h2>
                        <p className="text-gray-300 mt-2 text-sm">Unravel letters, Spark words, Encourage learning.</p>
                        <p className="mt-2">Developed by <span className="text-[#FF1000]">Julius Bourbon</span></p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="/" className="hover:text-[#FF1000] transition-colors">Home</a></li>
                            <li><a href="/wordit" className="hover:text-[#FF1000] transition-colors">Word It!</a></li>
                            <li><a href="/wordle" className="hover:text-[#FF1000] transition-colors">Wordle</a></li>
                            <li><a href="/dictionary" className="hover:text-[#FF1000] transition-colors">Dictionary</a></li>
                        </ul>
                    </div>

                     <div>
                        <h3 className="font-bold mb-3">Follow Me</h3>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/bourbonpath" target='_blank' aria-label="Instagram">
                                <img src="/Instagram.png" className='w-10 h-10 transition-transform hover:scale-110' alt="Instagram" />
                            </a>
                            <a href="https://github.com/JuliusBourbon" target='_blank' aria-label="Github">
                                <img src="/Github.svg" className='w-10 h-10 transition-transform hover:scale-110' alt="Github" />
                            </a>
                            <a href="https://x.com/juliusbourbonn" target='_blank' aria-label="X (Twitter)">
                                <img src="/Xicon.png" className='w-10 h-10 transition-transform hover:scale-110 rounded-full' alt="X" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Scribely. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer
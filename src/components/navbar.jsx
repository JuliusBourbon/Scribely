import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const linkClassName = ({isActive}) => `${isActive ? 'text-[#FF1000] font-extrabold' : 'font-medium'}`

    return (
        <nav className="top-0 left-0 right-0 flex items-center justify-between px-10 py-4 bg-transparent">
            <div className="flex justify-between items-center gap-20">
                <NavLink className="text-3xl font-extrabold text-[#FF1000]">
                    Scribely
                </NavLink>

                <div className="flex gap-8 text-white">
                    <NavLink to='/' className={linkClassName}>Home</NavLink>
                    <div className="relative">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1.5 text-white hover:text-gray-300 transition-colors"
                        >
                            Word It!
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        <div
                            className={`absolute top-full mt-3 w-40 flex-col p-2 rounded-md bg-white/80 backdrop-blur-sm shadow-lg ${isExpanded ? 'flex' : 'hidden'}`}
                        >
                            <NavLink to='/wordit' className={({ isActive }) => ` px-3 py-2 rounded-md hover:bg-black/10 ${isActive ? 'text-[#FF1000] font-bold' : 'text-black'}`}>Word It!</NavLink>
                            <NavLink to='/wordle' className={({ isActive }) => ` px-3 py-2 rounded-md hover:bg-black/10 ${isActive ? 'text-[#FF1000] font-bold' : 'text-black'}`}>Wordle</NavLink>
                        </div>
                    </div>
                    <NavLink to='/dictionary' className={linkClassName}>Dictionary</NavLink>
                </div>

            </div>

            <div>
                <a target="_blank" href="https://trakteer.id/juliusbourbon/gift" className="bg-[#001D6E] text-white font-bold px-6 py-2 rounded-full shadow hover:border-2 ">
                    Donate!
                </a>
            </div>
        </nav>

    )
}
export default Navbar

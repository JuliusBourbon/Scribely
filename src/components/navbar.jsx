import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);


    const closeAllMenus = () => {
        setIsDropdownExpanded(false);
        setIsMenuOpen(false);
    }

    const linkClassName = ({ isActive }) =>
        `hover:text-[#FF1000] transition-colors duration-300 ${isActive ? 'text-[#FF1000] font-extrabold' : 'font-medium'}`;

    const dropdownLinkClassName = ({ isActive }) =>
        `px-3 py-2 rounded-md hover:bg-black/10 w-full text-left ${isActive ? 'text-[#FF1000] font-bold' : 'text-black'}`;
    
    const mobileLinkClassName = ({ isActive }) =>
        `text-3xl hover:text-[#FF1000] transition-colors duration-300 ${isActive ? 'text-[#FF1000] font-extrabold' : 'font-medium text-white'}`;


    return (
        <nav className="top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-4 bg-transparent z-50">
            <NavLink to="/" onClick={closeAllMenus} className="text-3xl font-extrabold text-[#FF1000] z-50">
                Scribely
            </NavLink>

            <div className="hidden md:flex items-center gap-8 text-white">
                <NavLink to='/' className={linkClassName}>Home</NavLink>
                <div className="relative">
                    <button onClick={() => setIsDropdownExpanded(!isDropdownExpanded)} className="flex items-center gap-1.5 font-medium text-white hover:text-[#FF1000] transition-colors">
                        Word It!
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-3 h-3 transition-transform duration-300 ${isDropdownExpanded ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>

                    {isDropdownExpanded && (
                        <div className="absolute top-full mt-3 w-40 flex flex-col p-2 rounded-md bg-white/90 backdrop-blur-sm shadow-lg">
                            <NavLink to='/wordit' onClick={() => setIsDropdownExpanded(false)} className={dropdownLinkClassName}>Word It!</NavLink>
                            <NavLink to='/wordle' onClick={() => setIsDropdownExpanded(false)} className={dropdownLinkClassName}>Wordle</NavLink>
                        </div>
                    )}
                </div>
                <NavLink to='/dictionary' className={linkClassName}>Dictionary</NavLink>
            </div>

            <div className="hidden sm:block">
                <a target="_blank" rel="noopener noreferrer" href="https://teer.id/juliusbourbon" className="bg-[#001D6E] inline-block text-white font-bold px-5 py-2 rounded-full shadow-lg hover:bg-[#02164d] transition-all transform hover:scale-105">
                    Donate!
                </a>
            </div>

            <div className="md:hidden z-50">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 h-screen w-full bg-gray-900/80 backdrop-blur-md md:hidden transition-transform duration-300 ease-in-out z-40
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    <NavLink to='/' onClick={closeAllMenus} className={mobileLinkClassName}>Home</NavLink>
                    <NavLink to='/wordit' onClick={closeAllMenus} className={mobileLinkClassName}>Word It!</NavLink>
                    <NavLink to='/wordle' onClick={closeAllMenus} className={mobileLinkClassName}>Wordle</NavLink>
                    <NavLink to='/dictionary' onClick={closeAllMenus} className={mobileLinkClassName}>Dictionary</NavLink>
                     <a target="_blank" rel="noopener noreferrer" href="https://teer.id/juliusbourbon" className="mt-4 bg-[#001D6E] text-white font-bold px-8 py-3 rounded-full shadow hover:bg-opacity-90 transition-colors text-xl">
                        Donate!
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
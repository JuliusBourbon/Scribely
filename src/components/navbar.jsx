import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const linkClassName = ({isActive}) => `${isActive ? 'text-[#FF1000] font-extrabold' : 'font-medium'}`

    return (
        <nav className="top-0 left-0 right-0 flex items-center justify-between px-10 py-4 bg-transparent">
        <div className="flex justify-between items-center gap-20">
            <NavLink className="text-3xl font-extrabold text-[#FF1000]">
                Scribely
            </NavLink>

            <div className="flex gap-8 text-white">
                <NavLink to='/' className={linkClassName}>Home</NavLink>
                <NavLink to='/wordit' className={linkClassName}>Word It!</NavLink>
                <NavLink to='/search' className={linkClassName}>Search</NavLink>
            </div>

        </div>

        <div>
            <button className="bg-[#001D6E] text-white font-bold px-6 py-2 rounded-full shadow">
                Donate!
            </button>
        </div>
    </nav>

    )
}
export default Navbar

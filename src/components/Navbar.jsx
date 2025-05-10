import React from 'react'
import { GiCheckMark } from "react-icons/gi";
const Navbar = () => {
  return (
    <nav className="flex justify-around bg-green-200 text-green-700 py-2">
        <span className="font-bold text-2xl mx-9 flex"><GiCheckMark />TickTask</span>
        <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all duration-50">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-50">My Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar

"use client";
import Link from "next/link";
import Logo from "./logo";
import { LuSearch, LuNotebookPen, LuX, LuMenu  } from "react-icons/lu";
import MobileNav from "./mobileNav";
import { useState } from "react";

export const navLinks = [
  { url: "/", label: "Home" },
  { url: "/article", label: "Article" },
  { url: "/about", label: "About" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="h-18 w-full fixed top-0 left-0 z-50 backdrop-blur-xl backdrop-saturate-50">
      <div className="flex items-center justify-between h-full w-[90%] mx-auto">
        <Logo />
        <ul className="flex items-center gap-4 md:gap-8 text-gray-400 font-semibold">
          <li className="cursor-pointer flex items-center gap-1">
            <LuSearch size={20} />
            <span className="hidden md:block">Search</span>
          </li>
          <li className="cursor-pointer flex items-center gap-1">
            <LuNotebookPen size={20} />
            <span className="hidden md:block">Write</span>
          </li>
          {navLinks.map((link) => {
            return (
              <li
                key={link.url}
                className="hidden md:block hover:text-gray-200"
              >
                <Link href={link.url}>{link.label}</Link>
              </li>
            );
          })}
          <li className="bg-primary text-gray-200 px-3 lg:px-5 py-2 rounded-full cursor-pointer">
            Login
          </li>
          <li className="cursor-pointer md:hidden z-80" onClick={()=> setMenuOpen(pre => !pre)}>
            {menuOpen ? <LuX size={25}/>:  <LuMenu size={25} />}
          </li>
        </ul>
      </div>
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};

export default Navbar;

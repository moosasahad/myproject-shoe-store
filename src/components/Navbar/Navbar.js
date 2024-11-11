import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

function Navbare() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const home = location.pathname == '/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
//className="bg-transparent shadow-md fixed top-0 w-full z-20"
  return (
    <div  className={`${home ? `fixed w-full transition-colors duration-300  top-0 z-20 ${scrolled ? 'bg-slate-200 shadow-md' : 'bg-transparent'}` : 'fixed w-full transition-colors duration-300  top-0 z-20 bg-slate-200 '}`}>

      <nav className="max-w-screen-xl mx-auto flex items-center justify-between p-3">
        
        {/* Brand Name */}
        <NavLink
          to="/"
          className={`${home ? `text-gray-800 text-4xl  font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 text-4xl  font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline'}`}>
        
          My Store
        </NavLink>

        {/* Toggle Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 focus:outline-none">
            {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>

        {/* Main Navigation Links (Responsive) */}
        <div
          className={`flex-col md:flex-row items-center md:flex text-lg space-y-4 md:space-y-0 md:space-x-6 absolute md:relative w-full md:w-auto md:block top-full left-0 md:top-auto bg-sky-500 md:bg-transparent transition-all duration-300 ease-in ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <NavLink
            to="/"
            className={`${home ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline '}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/men"
            className={`${home ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline '}`}
          >
            Men
          </NavLink>
          <NavLink
            to="/women"
            className={`${home ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline '}`}
          >
            Women
          </NavLink>
          <NavLink
            to="/collection"
            className={`${home ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline '}`}
          >
            {/* "text-gray-700 font-bold hover:text-blue-500 transition duration-200 no-underline focus:text-blue-500" */}
            Collection
          </NavLink>
        </div>

        {/* Right Side (Search, Cart, Account) */}
        <div className="flex items-center space-x-4 text-gray-700">
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200">
            Search
          </button>
          <NavLink
            to="/cartui"
            className={`${home ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline '}`}
          >
            <FaShoppingCart className="text-2xl" />
            {/* <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span> */}
          </NavLink>
          <NavLink
            to="/login"
            className={`${home ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? ' text-gray-800' : 'text-slate-200'}` : 'text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline '}`}
            // "flex items-center text-gray-700 hover:text-blue-500 transition duration-200"
          >
             <MdAccountCircle className="text-2xl" />
            {/*<span className="ml-2 hidden md:inline">Account</span> */}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbare;

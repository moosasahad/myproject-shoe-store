import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";

function Navbare() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userInitial, setUserInitial] = useState("");

  const location = useLocation();
  const home = location.pathname === "/";

  // Function to update userInitial based on cookies
  const updateUserInitial = () => {
    const user = Cookies.get("users");
    const jsuser = user ? JSON.parse(user) : null;
    setUserInitial(jsuser ? jsuser.name.name.charAt(0).toUpperCase() : "");
  };

  useEffect(() => {
    // Update userInitial on component mount
    updateUserInitial();

    // Add scroll event listener
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    // Watch for changes in the cookies to update userInitial when the cookie changes
    const intervalId = setInterval(() => {
      updateUserInitial();
    }, 1000); // Check every second for cookie updates

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []); // Empty dependency array ensures effect only runs on mount
const search =(e)=>{
console.log("search bar", e.target.value);


}
  return (
    <div
      className={`${
        home
          ? `fixed w-full transition-colors duration-300 top-0 z-20 ${scrolled ? "bg-slate-200 shadow-md" : "bg-transparent"}`
          : "fixed w-full transition-colors duration-300 top-0 z-20 bg-slate-200"
      }`}
    >
      <nav className="max-w-screen-xl flex items-center justify-between ml-6 w-full">
        <NavLink
          to="/"
          className={`${
            home
              ? `text-gray-800 text-4xl font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${
                  scrolled ? "text-gray-800" : "text-slate-200"
                }`
              : "text-gray-800 text-4xl font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline"
          }`}
        >
          My Store
        </NavLink>

        {/* Toggle Icon for Mobile */}
        <div
          className={`flex-col md:flex-row px-4 items-center text-lg space-y-4 md:space-y-0 md:space-x-6 absolute md:relative w-full p-4  md:w-auto md:block top-full right-0 md:top-auto bg-sky-500 md:bg-transparent transition-all duration-300 ease-in ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          {["/", "/men", "/women", "/collection"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={`${
                home
                  ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${
                      scrolled ? "text-gray-800" : "text-slate-200"
                    }`
                  : "text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline"
              }`}
            >
              {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
        </div>

        {/* Right Side (Search, Cart, Account) */}
        <div className="flex items-center space-x-4 text-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border-1 border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full pl-10"
              onChange={search}
            />
            <button
              className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 py-2 bg-gray-500 text-white rounded-full h-full hover:bg-blue-600 transition duration-200"
            >
              <IoSearch />
            </button>
          </div>
          <NavLink
            to="/cartui"
            className={`${
              home
                ? `text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${
                    scrolled ? "text-gray-800" : "text-slate-200"
                  }`
                : "text-gray-800 font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline"
            }`}
          >
            <span className="bg-gray-500 text-white rounded-full h-10 w-10 flex items-center justify-center mt-2 hover:bg-blue-500">
              <FaShoppingCart className="text-2xl" />
            </span>
          </NavLink>
          <NavLink
            to="/login"
            className={`${home ? `font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline ${scrolled ? 'text-gray-800' : 'text-slate-200'}` : 'font-bold tracking-wider hover:text-blue-500 transition duration-200 no-underline text-gray-800'}`}
          >
            {userInitial ? (
              <span className="bg-gray-500 text-white text-xl rounded-full h-10 w-10 flex items-center justify-center mt-2 hover:bg-blue-500">
                {userInitial}
              </span>
            ) : (
              <MdAccountCircle className="text-9xl text-gray-500 hover:text-blue-500 h-11 w-11 flex items-center justify-center" />
            )}
          </NavLink>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 bg-gray-500 focus:outline-none m-2"
          >
            {menuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-xl" />}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbare;

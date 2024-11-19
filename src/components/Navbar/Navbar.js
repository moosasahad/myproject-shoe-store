import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the heart icon
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Valuecontext } from "../../App";

function Navbare() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {userInitial} = useContext(Valuecontext)
  const [initial,setUserInitial]=useState('')


  const location = useLocation();
  const home = location.pathname === "/";

  const updateUserInitial = () => {
    const user = Cookies.get("users");
    let initial = "";
    console.log("hdshfgsdjfds",user);
    
  
    if (user) {
      try {
        const jsuser = JSON.parse(user);
        console.log("jsuser",jsuser.name.name);
        
        if (jsuser && typeof jsuser.name.name === "string") {
          initial = jsuser.name.name.charAt(0).toUpperCase();
          setUserInitial(initial)
          console.log("initial",initial);
          
        }
        console.log("ghdskjfhdsjkfhdfhjkdshfkjsd............");
        
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }
console.log("initial",initial);

  useEffect(() => {
    updateUserInitial();

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    const intervalId = setInterval(updateUserInitial, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const search = (e) => {
    console.log("search bar", e.target.value);
  };
  useEffect(()=>{
    updateUserInitial()
  })

  return (
    <div
      className={`${
        home
          ? `fixed w-full transition-colors duration-300 top-0 z-20 ${scrolled ? "bg-slate-200 shadow-md" : "bg-transparent"}`
          : "fixed w-full transition-colors duration-300 top-0 z-20 bg-slate-200"
      }`}
    >
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
        <NavLink
          to="/"
          className={`text-4xl font-bold tracking-wider transition duration-200 no-underline ${
            home && !scrolled ? "text-slate-200" : "text-gray-800 hover:text-blue-500"
          }`}
        >
          My Store
        </NavLink>

       

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col  md:flex-row md:space-x-6 items-center absolute md:relative w-full md:w-auto bg-sky-500 md:bg-transparent top-full right-0 p-4 md:p-0 md:flex md:items-center transition-all duration-300 ease-in`}
        >
          {["/", "/men", "/women", "/collection"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={`text-lg font-bold transition duration-200 no-underline ${
                home && !scrolled ? "text-slate-200" : "text-gray-800 hover:text-blue-500"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-4">
        <div className="hidden md:flex relative">
  <input
    type="text"
    placeholder="Search..."
    className="px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full"
    onChange={search}
  />
  <button className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 py-2 bg-gray-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
    <IoSearch />
  </button>
</div>
          <NavLink to="/cartui" className="relative">
            <FaShoppingCart className="text-2xl text-gray-500 hover:text-blue-500" />
          </NavLink>
          <NavLink to="/wishlist" className="relative">
          <FontAwesomeIcon
                    icon={faHeart}
                    className="text-2xl text-gray-500 hover:text-blue-500"
                  />
          </NavLink>
          <NavLink to="/login">
            {userInitial ? (
              <span className="text-xl bg-gray-500 text-white rounded-full h-7 w-7 flex items-center justify-center hover:bg-blue-500 no-underline relative top-2">
                {userInitial}
              </span>
            ) : (
              <MdAccountCircle className="text-3xl text-gray-500" />
            )}
          </NavLink>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {menuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-xl" />}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbare;

import React, { useState } from "react";
import "./sidebar.css";
import { BiSolidDashboard } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (item) => {
    setActiveItem(item); // Set active item
  };

  return (
    <div className="flex flex-col w-52 h-screen bg-gray-900 text-white">
      {/* Logo Section */}
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        <span className="text-yellow-400 text-center text-4xl">My Store</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <NavLink
          to={"/"}
           className="flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline focus:bg-slate-700 focus:text-yellow-200">
            <BiSolidDashboard className="text-2xl text-gray-400 hover:text-yellow-200 focus:text-yellow-200" />
            <span className="my-auto text-base ml-3 text-gray-400 hover:text-yellow-200 focus:text-yellow-200">
              Dashboard
            </span>
          </NavLink>
          <NavLink className="flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline focus:bg-slate-700 focus:text-yellow-200">
            <BiSolidDashboard className="text-2xl text-gray-400 hover:text-yellow-200 focus:text-yellow-200" />
            <span className="my-auto text-base ml-3 text-gray-400 hover:text-yellow-200 focus:text-yellow-200">
              Dashboard
            </span>
          </NavLink>
          <NavLink className="flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline focus:bg-slate-700 focus:text-yellow-200">
            <BiSolidDashboard className="text-2xl text-gray-400 hover:text-yellow-200 focus:text-yellow-200" />
            <span className="my-auto text-base ml-3 text-gray-400 hover:text-yellow-200 focus:text-yellow-200">
              Dashboard
            </span>
          </NavLink>
          <NavLink className="flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline focus:bg-slate-700 focus:text-yellow-200">
            <BiSolidDashboard className="text-2xl text-gray-400 hover:text-yellow-200 focus:text-yellow-200" />
            <span className="my-auto text-base ml-3 text-gray-400 hover:text-yellow-200 focus:text-yellow-200">
              Dashboard
            </span>
          </NavLink>
          <NavLink className="flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline focus:bg-slate-700 focus:text-yellow-200">
            <BiSolidDashboard className="text-2xl text-gray-400 hover:text-yellow-200 focus:text-yellow-200" />
            <span className="my-auto text-base ml-3 text-gray-400 hover:text-yellow-200 focus:text-yellow-200">
              Dashboard
            </span>
          </NavLink>
          <NavLink className="flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline focus:bg-slate-700 focus:text-yellow-200">
            <BiSolidDashboard className="text-2xl text-gray-400 hover:text-yellow-200 focus:text-yellow-200" />
            <span className="my-auto text-base ml-3 text-gray-400 hover:text-yellow-200 focus:text-yellow-200">
              Dashboard
            </span>
          </NavLink>
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm">Ann Smith</p>
        <p className="text-xs text-gray-400">Administrator</p>
        <button className="mt-2 px-4 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

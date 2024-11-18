import React, { useContext, useState } from "react";
import "./sidebar.css";
import { BiSolidDashboard } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi"; // Import an order icon
import { axiosPrivate } from "../../../axiosinstance";
import { Valuecontext } from "../../../App";



const Sidebar = () => {
  const {setAdminstate} = useContext(Valuecontext)
  const loguteadmin =async ()=>{
    try {
      const res = await axiosPrivate.post("adminlogut")
      console.log("adminlogut",res);
      setAdminstate()
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
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
            to="/"
            className={({ isActive }) =>
              `flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline ${
                isActive ? "bg-slate-700 text-yellow-200" : "text-gray-400"
              } hover:bg-slate-700 hover:text-yellow-200`
            }
          >
            <BiSolidDashboard className="text-2xl" />
            <span className="my-auto text-base ml-3 text-slate-400">Dashboard</span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline ${
                isActive ? "bg-slate-700 text-yellow-200" : "text-gray-400"
              } hover:bg-slate-700 hover:text-yellow-200`
            }
          >
            <FaShoppingCart className="text-2xl" />
            <span className="my-auto text-base ml-3 text-slate-400">Products</span>
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline ${
                isActive ? "bg-slate-700 text-yellow-200" : "text-gray-400"
              } hover:bg-slate-700 hover:text-yellow-200`
            }
          >
            <FaUser className="text-2xl" />
            <span className="my-auto text-base ml-3 text-slate-400">User</span>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex ml-4 p-2 rounded-s-xl cursor-pointer no-underline ${
                isActive ? "bg-slate-700 text-yellow-200" : "text-gray-400"
              } hover:bg-slate-700 hover:text-yellow-200`
            }
          >
            <FiShoppingCart className="mr-2 text-xl" />
            <span className="my-auto text-base ml-3 text-slate-400">Orders</span>
          </NavLink>
          
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm">Ann Smith</p>
        <p className="text-xs text-gray-400">Administrator</p>
        <button onClick={loguteadmin} className="mt-2 px-4 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

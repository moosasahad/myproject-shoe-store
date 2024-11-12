import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";


import axios from "axios";
import { axiosPrivate } from "../../axiosinstance";

function Login() {
  const [status, setStatus] = useState();

  const logout = async () => {
    try {
      const response = await axiosPrivate.post(
        "/logut",{});
      setStatus()
      toast.success("Logout!", {
        position: "top-center",
        autoClose:500,
        style: { backgroundColor: "red", color: "#fff", fontSize: "16px" },
        icon: "🚀",
        
      });
      setStatus()
    } catch (error) {
      console.error("There was an error logging in:", error);
      toast.error('Login Error');
    }
    

  //  navigate("/login");
  };
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", inputValue.email);
    console.log("Password:", inputValue.password);
    try {
      const response = await axiosPrivate.post(
        "/login",
        {
          email: inputValue.email,
          password: inputValue.password,
        }
      );
      console.log("Response:", response.data.token);
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose:1500,
        style: { backgroundColor: "#4CAF50", color: "#fff", fontSize: "16px" },
        icon: "🚀",
        
      });
  
      // Store user information in cookies
      Cookies.set("users", JSON.stringify(response.data));
  
      // Update the status immediately
      setStatus(response.data);
  
    } catch (error) {
      console.error("There was an error logging in:", error);
      toast.error('Login Error');
    }
  };
  const navigate = useNavigate();
  // let users = Cookies.get("user");
  // console.log("activeUser",users);
  // const [state, setState] = useState(false);
   useEffect(()=>{
    let users = Cookies.get("users");
    if(users){
      setStatus(JSON.parse(users))   
    }
   },[])
console.log("status",status);

  if (!status) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pattern bg-slate-200">
        <div className="bg-emerald-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h4 className="text-4xl font-bold text-gray-700">Login</h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg text-black mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg text-black mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Link
                to="/registration"
                className="text-blue-500 hover:underline text-sm"
              >
                Create a new account
              </Link>
              <button
                type="submit"
                className="bg-blue-500 font-bold text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:ring-offset-1"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pattern bg-slate-200">
        <div className="p-6 bg-emerald-50 shadow-lg border border-gray-500 rounded-md flex flex-col items-center w-80">
          <MdAccountBox className="text-5xl text-blue-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-800 mb-3">{status.name.name}</h1>
          <button className="w-36 m-2 bg-gray-500 opacity-75 boredr-4">
            Orders
          </button>
          <div className="flex space-x-2 m-2">
            <button
              className="mx-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={logout}
            >
             <FiLogOut />

            </button>
            <Link to="/">
              <button className="mx-1 bg-blue-500 text-white text-3xl rounded-md hover:bg-blue-600">
              <IoMdHome />

              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

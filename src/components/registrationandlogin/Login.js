import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";

import axios from "axios";

function Login() {
  const [status, setStatus] = useState();

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/logut",{},{withCredentials:true});
      setStatus()
      toast.error('Logout');
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
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email: inputValue.email,
          password: inputValue.password,
        },{withCredentials:true}
      );
      console.log("Response:", response.data.token);
      toast.success('Login Success');
      

      // Cookies.set("user", JSON.stringify(response.data));
      // Cookies.set("token", response.data.token);
    } catch (error) {
      console.error("There was an error logging in:", error);
      toast.error('Login Error');
    }
  };
  const tost = () => {
    toast.success("This is a success message!");
  };
  const navigate = useNavigate();
  // let users = Cookies.get("user");
  // console.log("activeUser",users);
  // const [state, setState] = useState(false);
   useEffect(()=>{
    let users = Cookies.get("users");
    if(users){
      setStatus(JSON.parse(users))
    console.log("activeUser",JSON.parse(users));
    }
   },[status])
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
          <h1 className="text-xl font-semibold text-gray-800 mb-3">Faslu</h1>
          <button className="w-56 m-2 bg-gray-500 opacity-75 boredr-4">
            Orders
          </button>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
            <Link to="/">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Go Home
              </button>
            </Link>
            <button onClick={tost}>clcikme</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

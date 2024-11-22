import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { axiosPrivate } from "../../axiosinstance";
import { Valuecontext } from "../../App";
import { TbHomeStats } from "react-icons/tb";

function Login() {
  const [status, setStatus] = useState();
  const { setUserInitial, setAdminstate } = useContext(Valuecontext);

  const logout = async () => {
    try {
      const response = await axiosPrivate.post("/logut", {});
      setStatus();
      setUserInitial();
      toast.success("Logout!", {
        position: "top-center",
        autoClose: 500,
        style: { backgroundColor: "red", color: "#fff", fontSize: "16px" },
        icon: "🚀",
      });
      setStatus();
    } catch (error) {
      console.error("There was an error logging in:", error);
      toast.error("Login Error");
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
    // console.log("Email:", inputValue.email);
    // console.log("Password:", inputValue.password);
    try {
      const response = await axiosPrivate.post("/login", {
        email: inputValue.email,
        password: inputValue.password,
      });
      // console.log("Response:", response.data.token);
      console.log("response",response.data.admin)
      if (response.data.admin) {
        setAdminstate(response.data);
      }
      navigate("/");
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 1500,
        style: { backgroundColor: "#4CAF50", color: "#fff", fontSize: "16px" },
        icon: "🚀",
      });
      let initial = response.data.name.name.charAt(0).toUpperCase();
      // console.log("initial",initial);

      setUserInitial(initial);

      // Store user information in cookies
      Cookies.set("users", JSON.stringify(response.data));

      // Update the status immediately
      setStatus(response.data);
    } catch (error) {
      console.error("There was an error logging in:", error);
      // toast.error('Login Error');
        // {toast.warning(error.response.data.message)||toast.success("success")}      
    }
  };
  const navigate = useNavigate();
  // let users = Cookies.get("user");
  // console.log("activeUser",users);
  // const [state, setState] = useState(false);
  useEffect(() => {
    let users = Cookies.get("users");
    if (users) {
      setStatus(JSON.parse(users));
    }
  }, []);
  // console.log("status", status);
  const userss = Cookies.get("users");
  let parseuser = userss ? JSON.parse(userss) : null;

  if (parseuser) {
    const userInitial = parseuser.name.name.charAt(0).toUpperCase();
    // console.log("initial", userInitial);
    setUserInitial(userInitial);
  } else {
    // console.log("User data is missing or invalid.");
    setUserInitial("");
  }

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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-200 to-gray-300">
  <div className="p-8 bg-white shadow-lg border border-gray-300 rounded-lg flex flex-col items-center w-96">
    {/* Profile Icon */}
    <MdAccountBox className="text-6xl text-blue-500 mb-4" />

    {/* Profile Name */}
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      {status.name.name}
    </h1>

    {/* Orders Button */}
    <button
      onClick={() => navigate("/orderse")}
      className="w-40 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 mb-4"
    >
      View Orders
    </button>

    {/* Action Buttons */}
    <div className="flex space-x-4">
      {/* Logout Button */}
      <button
        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
        onClick={logout}
      >
        <FiLogOut className="text-lg" />
      </button>

      {/* Home Button */}
      <Link to="/">
        <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300">
          <IoMdHome className="text-lg" />
        </button>
      </Link>
    </div>
  </div>
</div>

    );
  }
}

export default Login;
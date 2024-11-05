import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import Cookies from "js-cookie"

import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";

import axios from "axios";

function Login() {
  const [status, setStatus] = useState(false);

  const logout = () => {
    Cookies.remove("user")
    navigate("/")
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
      const response = await axios.post("http://localhost:3000/login", {
        email: inputValue.email,
        password: inputValue.password,
      });
      console.log("Response:", response.data.token);
      setStatus(true);
      alert("login sucsses");
    
      Cookies.set("user", JSON.stringify(response.data));
      Cookies.set("token", response.data.token);
    } catch (error) {
      console.error("There was an error logging in:", error);
     
    }

  };
  const navigate = useNavigate()
  const activeUser = Cookies.get("user")
  console.log(activeUser);
  const [state,setState] = useState(false)
//  useEffect(()=>{
    

//  },[state])

  if (!activeUser) {
    return (
      <div>
        <div className="maincontainer">
          <div className="seconddiv">
            <h4>Sign in / Sign up</h4>
            <br />
            <form onSubmit={handleSubmit} className="loginform">
              <label>Email or number</label>
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleChange}
              />
              <br />
              <br />
              <div className="buttonandlinkdiv">
                <Link to="/registration">Create a new account</Link>
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="maindiv">
        <div className="subdiv">
          <MdAccountBox className="subdivicon" />
          <h1>djhfkjshfk</h1>
          <div>
            <button className="button1" onClick={logout}>
              Logout
            </button>
            <Link to="/">
              <button className="button2">Go Home</button>
            </Link>
          </div>
         
        </div>
      </div>
    );
  }
}

export default Login;

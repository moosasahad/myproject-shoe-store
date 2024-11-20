import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiShowAlt } from "react-icons/bi"
import { FaRegEyeSlash } from "react-icons/fa";

function Registration() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
        email: '',
        number: '',
        password: '',
        confirmpassword: '',
        
    });

    const [focus, setFocus] = useState({
        name: false,
        email: false,
        number: false,
        password: false,
        confirmpassword: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false); // Track form submission

    const handleForm = async (evn) => {
        evn.preventDefault();
        setSubmitted(true);
        if (evn.target.checkValidity()) {
            // alert("login succssesed") 
            try {
                const response = await axios.post("http://localhost:3000/signup", input);
                console.log("Form submitted successfully"); 
                console.log(response.data.massage);
                
                navigate('/login')

                   
            } catch (error) {
                console.error("Error submitting form", error);
                console.log(error.response.data);
                
            }
            // setInput({
            //     name: '',
            //     email: '',
            //     number: '',
            //     password: '',
            //     confirmpassword: '',
            // });
            setFocus({
                name: false,
                email: false,
                number: false,
                password: false,
                confirmpassword: false
            });
            setSubmitted(false);
        }
        
    };

    const getInputValues = (evn) => {
        const name = evn.target.name;
        const value = evn.target.value;
        setInput({
            ...input,
            [name]: value
        });
    };

    const handleFocus = (evn) => {
        const name = evn.target.name;
        setFocus({
            ...focus,
            [name]: true
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-pattern bg-white">
  <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign up.</h1>

    <form onSubmit={handleForm} className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        name="name"
        type="text"
        value={input.name}
        onChange={getInputValues}
        pattern=".{2,}"
        required
        onBlur={handleFocus}
        focus={focus.name.toString()}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {(submitted || focus.name) && input.name.length < 2 && (
        <span className="text-sm text-red-500">Please enter your full name</span>
      )}

      <label className="block text-sm font-medium text-gray-700">Email id</label>
      <input
        name="email"
        type="email"
        value={input.email}
        onChange={getInputValues}
        required
        onBlur={handleFocus}
        focus={focus.email.toString()}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {(submitted || focus.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) && (
        <span className="text-sm text-red-500">Enter a valid email id</span>
      )}

      <label className="block text-sm font-medium text-gray-700">Phone number</label>
      <input
        name="number"
        type="tel"
        value={input.number}
        onChange={getInputValues}
        required
        pattern="^[1-9]\d{9}$"
        onBlur={handleFocus}
        focus={focus.number.toString()}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {(submitted || focus.number) && !/^[1-9]\d{9}$/.test(input.number) && (
        <span className="text-sm text-red-500">Please enter a correct phone number</span>
      )}

      <label className="block text-sm font-medium text-gray-700">Password</label>
      <div className="flex items-center space-x-2">
      <div className="relative w-full">
      <div className="relative w-full">
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    value={input.password}
    onChange={getInputValues}
    required
    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
    onBlur={handleFocus}
    focus={focus.password.toString()}
    className="w-full px-4 py-2 pr-12 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="button"
    className="absolute inset-y-0 right-1 bottom-3 flex items-center text-2xl text-gray-600 bg-transparent"
    onClick={togglePasswordVisibility}
  >
    {showPassword ? <FaRegEyeSlash /> : <BiShowAlt />}
  </button>
</div>

</div>

      </div>
      {(submitted || focus.password) && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(input.password) && (
        <span className="text-sm text-red-500">Password must have at least 6 characters including one uppercase, one lowercase, and one digit</span>
      )}

      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input
        name="confirmpassword"
        type={showPassword ? "text" : "password"}
        value={input.confirmpassword}
        onChange={getInputValues}
        required
        pattern={input.password}
        onBlur={handleFocus}
        focus={focus.confirmpassword.toString()}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {(submitted || focus.confirmpassword) && input.password !== input.confirmpassword && (
        <span className="text-sm text-red-500">Password does not match</span>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign up
      </button>
    </form>
  </div>
</div>

    );
}

export default Registration;

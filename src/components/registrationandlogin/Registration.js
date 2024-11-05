import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className='maincontainer'>
            <div className='subcontainer'>
                <h1>Sign up.</h1>
                <br />

                <form onSubmit={handleForm}>
                    <label>Name</label>
                    <input
                        name='name'
                        type="text"
                        value={input.name}
                        onChange={getInputValues}
                        pattern=".{2,}"
                        required
                        onBlur={handleFocus}
                        focus={focus.name.toString()}
                    />
                    {(submitted || focus.name) && input.name.length < 2 && (
                        <span>Please enter your full name</span>
                    )}

                    <label>Email id</label>
                    <input
                        name='email'
                        type="email"
                        value={input.email}
                        onChange={getInputValues}
                        required
                        onBlur={handleFocus}
                        focus={focus.email.toString()}
                    />
                    {(submitted || focus.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) && (
                        <span>Enter a valid email id</span>
                    )}
                    <br />

                    <label>Phone number</label>
                    <input
                        name='number'
                        type="tel"
                        value={input.number}
                        onChange={getInputValues}
                        required
                        pattern="^[1-9]\d{9}$"
                        onBlur={handleFocus}
                        focus={focus.number.toString()}
                    />
                    {(submitted || focus.number) && !/^[1-9]\d{9}$/.test(input.number) && (
                        <span>Please enter a correct phone number</span>
                    )}
                    <br />

                    <label>Password</label>
                    <div className="password-container">
                        <input
                            name='password'
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            onChange={getInputValues}
                            required
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                            onBlur={handleFocus}
                            focus={focus.password.toString()}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {(submitted || focus.password) && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(input.password) && (
                        <span>Password must have at least 6 characters including one uppercase, one lowercase, and one digit</span>
                    )}
                    <br />

                    <label>Confirm Password</label>
                    <input
                        name='confirmpassword'
                        type={showPassword ? "text" : "password"}
                        value={input.confirmpassword}
                        onChange={getInputValues}
                        required
                        pattern={input.password}
                        onBlur={handleFocus}
                        focus={focus.confirmpassword.toString()}
                    />
                    {(submitted || focus.confirmpassword) && input.password !== input.confirmpassword && (
                        <span>Password does not match</span>
                    )}
                    <br />
                    <br />

                    <button className='registrationbutton' type='submit'>Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default Registration;

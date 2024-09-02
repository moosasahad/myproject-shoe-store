import React from 'react'
import { RiAccountCircleFill } from "react-icons/ri";
import './login.css'
import { Link } from 'react-router-dom';


function LogandReg() {
  return (
    <div className='maincountainer'>
    <div className='firstdiv'>
        <RiAccountCircleFill className='firstdivicon' />
        <h1>Sign in</h1>
        <h6>Use your details</h6>
    </div>
    <div className='seconddiv'>
        <h4>sign in/sign up </h4>
        <br />
       <form action="" className='loginform'>
       <label> Email or number </label>
        <input type="email" />
        <br />
        <label> password </label>
        <input type="password" />
        <br />
        <br />
        <div className='butonandlinkdiv'>
        <Link to="/registration"> Create a new account </Link>
        <button type='submit'>Login</button>
        </div>
       </form>
        

    </div>
    </div>
  )
}

export default LogandReg

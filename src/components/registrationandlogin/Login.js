import React from 'react'
import './login.css';
import useLogandReg from '../coustom hook/Logincostum';
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";


function Login() {
    const[handleChange,inputValue,handleSubmit,active,setActive]=useLogandReg()
    console.log("logut",active);
    
    

    const logout = ()=>{
        alert("you are logoute")
        localStorage.removeItem("inputValue")
        setActive(null)

    }
  if(!active){
    return (
        <div>
          <div className='maincontainer'>
                <div className='firstdiv'>
                    <RiAccountCircleFill className='firstdivicon' />
                    <h1>Sign in</h1>
                    <h6>Use your details</h6>
                </div>
                <div className='seconddiv'>
                    <h4>Sign in / Sign up</h4>
                    <br />
                    <form onSubmit={handleSubmit} className='loginform'>
                        <label>Email or number</label>
                        <input 
                            type="text" 
                            name='email'
                            value={inputValue.email}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Password</label>
                        <input
                            type="password" 
                            name='password'
                            value={inputValue.password}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <div className='buttonandlinkdiv'>
                            <Link to="/registration">Create a new account</Link>
                            <button  type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )
  }else{
    return <div className='maindiv'>
        <div className='subdiv'>
        <MdAccountBox className='subdivicon' />
        <h1>{active.name}</h1>
        <div>
        <button className='button1' onClick={logout}>Logout</button>
        <Link to="/"><button className='button2' >Go Home</button></Link>
        </div>  
        </div>
    </div>
  }
}

export default Login

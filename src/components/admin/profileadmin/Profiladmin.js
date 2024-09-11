import React, { useContext } from 'react'
import './Profileadmin.css'
import { Valuecontext } from '../../../App'
import { useNavigate } from 'react-router-dom';
import { BiSolidUserRectangle } from "react-icons/bi";


function Profiladmin() {
    const navigat = useNavigate()
    const{adminstate,setAdminstate}=useContext(Valuecontext)
    console.log("admin useer available ",adminstate);
    const logout = ()=>{
        const alerts = window.confirm("shuare are you log out !!!")
        if(alerts){
            localStorage.removeItem('admin')
            setAdminstate(null)
            navigat('/')
        }
       
    }
    const gohome = ()=>{
        navigat('/')
    }
    
  return (
    <div className='porfilemaindiv'>
        <div className='profilecontiner'>
            <div >
            <BiSolidUserRectangle className='icon' />
            </div>
            <h3 className='username'>{adminstate.name.toString().toUpperCase()}</h3>
            <h4>{adminstate.email}</h4>
<div className="prfilepagebutton">
<button style={{backgroundColor:'red'}} onClick={logout}>log out</button>
<button style={{backgroundColor:"green"}} onClick={gohome}>Go to Home</button>
</div>
        </div>
    </div>
  )
}

export default Profiladmin

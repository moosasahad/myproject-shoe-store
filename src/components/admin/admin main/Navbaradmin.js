
import React from 'react'
import { Link } from 'react-router-dom'
import './navbaradmin.css'
import { FaUserCircle } from "react-icons/fa";


function Navbaradmin() {
  return (
    <div>
    <div className="nvbarinsdmin">
      <div className="logicon">
      <Link className='logoname'>
        <span className='adminname'>My Store</span>
        </Link>
      </div>
      <div className="profile">
        <Link to="/profile" className='profileicon'>
        <FaUserCircle />
        </Link>
        
      </div>
     
    </div>
    </div>
  
    
  )
}

export default Navbaradmin

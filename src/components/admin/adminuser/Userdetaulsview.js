import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './userdetails.css'
function Userdetaulsview() {
    const[user, setUser]=useState([])
    const[cart,setCart]=useState([])
    const {id}=useParams()
    useEffect(()=>{
        const userdisplay = async ()=>{
            try {
                const response = await axios.get(`http://localhost:3000/usere/${id}`)
                const res = response.data;
                setUser(res)  
            } catch (error) {
                console.log(error);
            }
        }
        userdisplay()
    },[id])
    
    const handleStatusToggle = async () => {
          try {
            const updatedStatus = !user.status;           
            await axios.patch(`http://localhost:3000/usere/${id}`, { status: updatedStatus });
             setUser((prevUser) => ({ ...prevUser, status: updatedStatus }));
          } catch (error) {
            console.error("Error updating user status:", error);
          }
        
      };
      useEffect(() => {
        if (user) {
          setCart(user.cart || []);
        }
      }, [user])
      console.log("cart in user", cart);
      
  return (
    <div className='maindivinuserview'>
      
            <div className={user.status ? "usermain" :"newclass" }>
                <h2>Name : {user.name}</h2>
                <h5>Email : {user.email}</h5>
                <h5>Number : {user.number}</h5>
                <h5>Password :{user.password}</h5>
                <h5>status : {user.status ? 'Not blocked':'Blocked'}</h5>
                <button onClick={handleStatusToggle}>{!user.status? 'Not blocked':'Blocked'}</button>
      </div>
      <div className='cartiteminuser'>
      {cart.map((value,index)=>(
            <div className='singleproductdiv'>
              <img src={value.image} alt="" className='productimage' />
             <h6 className='hidenid'>{value.id}</h6>
              <h5>{value.brand}</h5>
              <h4><span>₹ - </span>{value.price}</h4>
              <h6>{value.name}</h6>
            </div>
        
          ))}
      </div>

    
    </div>
  )
}

export default Userdetaulsview

import React, { useContext, useState } from 'react';
import './HomeStyleFiles/Payment.css'
import {useNavigate}from "react-router-dom"
import { LoginContext } from '../contextFolder/UserContext';
import axios from 'axios';
function PaymentSection() {
    const navigate= useNavigate()
    

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: ''
    
  });

    const {activeUser,setActiveUser}= useContext(LoginContext)
    console.log("payment",activeUser);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
      
      setTimeout( async()=>{
        const response=  await axios.get(http://localhost:4000/Users/${activeUser.id})
        let userDetailss=response.data;
        let clearCart= await axios.put(http://localhost:4000/Users/${activeUser.id},{...userDetailss,cart:[]})
         setActiveUser(clearCart.data)
   
         alert("payment successfully")
         navigate("/cart")
      },3000)
   
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            required
          />
        </div>
       
       
        <div className="form-group">
          <label>phone Number:</label>
          <input
            type="number"
            name="cardNumber"
            value={userDetails.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        
       
        <button type="submit" className="submit-button">Pay Now</button>
      </form>
    </div>
  );
}

export default PaymentSection;
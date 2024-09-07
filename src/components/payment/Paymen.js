import React,{ useContext, useEffect, useState } from 'react';
import useLogandReg from '../coustom hook/Logincostum';
import { Valuecontext } from '../../App';
import axios from 'axios';
import './pymetn.css'
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const[data,setData]=useState({})
    const [payuser, setPayuser]=useState([])
    const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg()
    const{value} = useContext(Valuecontext)
    const navigating = useNavigate()


  const handleSubmi = async (e) => {
    e.preventDefault();
    let clearCart= await axios.put(`http://localhost:3000/usere/${active.id}`,{...active,cart:[]})
    localStorage.removeItem('cart')
    alert("payment successfully")
    navigating('/cartui')

  
 };

  return (
    <div className='paydivmain'>
     <form onSubmit={handleSubmi}  className='payingform'>
     <label>Name</label>
     <input type="text" 
      required
      />
      <label>email</label>
      <input type="email" 
      required
      />
      <label>phone number</label>
      <input type="tel" 
      required
      />
      <label>addres</label>
      <input type="text" 
      required
      />
      <button type='submit'>submit</button>
     </form>
    </div>
  );
}

export default PaymentPage;

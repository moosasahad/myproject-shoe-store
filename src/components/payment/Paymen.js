import React, { useState } from 'react';
import useLogandReg from '../coustom hook/Logincostum';

import './pymetn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();
  const navigating = useNavigate();
  
  const initiol = {
    name: '',
    email: '',
    phonenumber: '',
    address: '',
  };
  const [valu, setValue] = useState(initiol);

  const handilchange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmi = async (e) => {
    e.preventDefault();
    if (!active) {
      alert("User is not logged in.");
      return;
    }

    try {
      
      const response = await axios.put(`http://localhost:3000/usere/${active.id}`, {
        ...active,
        buying: valu,
        cart: [] 
      });
      localStorage.removeItem('cart');

      alert("Payment successful!");

      navigating('/cartui');
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed, please try again.");
    }
  };
  const navigateing = () => {
    navigating('/login');
  };

  return (
    <div className='paydivmain'>
      {active ? (
        <form onSubmit={handleSubmi} className='payingform'>
          <label>Name</label>
          <input 
            type="text" 
            name='name'
            value={valu.name}
            onChange={handilchange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name='email'
            value={valu.email}
            onChange={handilchange}
            required
          />
          <label>Phone Number</label>
          <input 
            type="tel"
            name='phonenumber'
            value={valu.phonenumber}
            onChange={handilchange}
            required
          />
          <label>Address</label>
          <input 
            type="text"
            name='address'
            value={valu.address}
            onChange={handilchange}
            required
          />
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <div>
          <h1>Please log in and try again</h1>
          <button onClick={navigateing}>Go to login page</button>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;

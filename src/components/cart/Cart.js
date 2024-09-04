import React, { useState, useEffect } from 'react';

function Cart() {
  
  const[cart, setCart]=useState([])
  console.log("neare",cart) 

  console.log("User data:", user);
  useEffect(()=>{
    
  },[cart])
  const addcart=(product)=>{
    setCart((prevproduct)=>{
     const updatecart = [...prevproduct,{...product}]
     setCart(updatecart)
     
    }
    )      
  }
  return [addcart]

}

export default Cart;

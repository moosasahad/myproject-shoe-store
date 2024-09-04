import React, { useState, useEffect } from 'react';

function Cart() {
  const [user, setUser] = useState([]);
  const[cart, setCart]=useState([])
  console.log("neare",cart) 

  useEffect(() => {
    const storedCurrentUser = JSON.parse(localStorage.getItem('inputValue'));
    if (storedCurrentUser) {
      setUser(storedCurrentUser);
    }
  }, []);

  console.log("User data:", user);
  useEffect(()=>{
    
    console.log(localStorage.getItem("cartitem"));
  },[cart])
  const addcart=(product)=>{
    setCart((prevproduct)=>{
     const updatecart = [...prevproduct,{...product}]
     setCart(updatecart)
     
    }
    )      
  }
  return [addcart,cart]

}

export default Cart;

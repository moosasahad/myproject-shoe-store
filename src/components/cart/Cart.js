import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useLogandReg from '../coustom hook/Logincostum';

function Cart() {
  const [user, setUser] = useState([]);
  const [cartproduct, setCartproduct] = useState([]);  // Initialize cartproduct as an empty array
  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartproduct(JSON.parse(savedCart));
    }
  }, []);

  // Set active user
  useEffect(() => {
    setUser(active);
  }, [active]);

  // Add product to cart or show an alert if it exists
  const addCart = (product) => {
    setCartproduct((prevCart = []) => {  // Ensure prevCart is always an array
      const existProduct = prevCart.find((item) => item.id === product.id);
      if (!existProduct) {
        const updatedCart = [...prevCart, { ...product, qty: 1 }];
        updateBackendCart(updatedCart); 
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      } else {
        alert("Product is already added to the cart.");
        return prevCart;  // Return the existing cart
      }
    });
  };

  // Update the backend cart for the user
  const updateBackendCart = async (updatedCart) => {
    try {
      if (user.id) {  // Ensure user id exists
        await axios.put(`http://localhost:3000/usere/${user.id}`, { ...user, cart: updatedCart });
        console.log("Cart updated on backend:", updatedCart);
      }
    } catch (error) {
      console.error("Error updating cart on backend:", error);
    }
  };

  // Save the cart to localStorage
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));  
  };

  console.log("Cart products:", cartproduct);
  console.log("User:", user);

  return [addCart];
}

export default Cart;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useLogandReg from '../coustom hook/Logincostum';

function Cart() {
  const [user, setUser] = useState([]);
  const [cartproduct, setCartproduct] = useState([]);
  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartproduct(JSON.parse(savedCart));  // Load cart from localStorage
    }
  }, []);

  useEffect(() => {
    setUser(active);
  }, [active]);

  const addCart = (product) => {
    setCartproduct(prevCart => {
      const existProduct = prevCart.find((item) => item.id === product.id);
      if (!existProduct) {
        const updatedCart = [...prevCart, { ...product, qty: 1 }];
        updateBackendCart(updatedCart);  // Update backend with new cart
        saveCartToLocalStorage(updatedCart);  // Save updated cart to localStorage
        return updatedCart;
      } else {
        alert("Product is already in the cart");
        return prevCart;  // Return the previous cart if the product already exists
      }
    });
  };

  // Function to update the cart in the backend
  const updateBackendCart = async (updatedCart) => {
    try {
      if (user.id) {  // Ensure user id exists
        await axios.put(`http://localhost:3000/usere/${user.id}`, {...user, cart: updatedCart });
        console.log("Cart updated on backend:", updatedCart);
      }
    } catch (error) {
      console.error("Error updating cart on backend:", error);
    }
  };

  // Function to save the cart to localStorage
  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));  // Save cart to localStorage
  };

  console.log("Cart products:", cartproduct);
  console.log("User:", user);

  return [addCart];
}

export default Cart;

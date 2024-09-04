import React, { useState, useEffect } from 'react';

function useCart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add product to cart
  const addCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...product }];
      return updatedCart;
    });
  };

  return [cart, addCart];
}

export default useCart;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserCart() {

  const navigate = useNavigate();

  const storedActiveUser = JSON.parse(localStorage.getItem('activeUserData'));
  const [activeUser, setActiveUser] = useState(storedActiveUser || null);

  const storedCart = JSON.parse(localStorage.getItem('cartData')) || [];
  const [cart, setCart] = useState(storedCart);
 

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cart));
  }, [cart]);


  //this function work when clicking addToCart button
  const addToCart = async (product) => {

    if (activeUser) {
      
      setCart((prevCart) => {
        console.log(prevCart);
        
        const existProduct = prevCart.find((item) => item.id === product.id);
        if (existProduct) {
          alert('Product is already in the cart');
          return prevCart;
        }

        const updatedCart = [...prevCart, { ...product, qty: 1 }];
        const updatedUser = { ...activeUser, cart: updatedCart };

        setActiveUser(updatedUser);
        localStorage.setItem('activeUserData', JSON.stringify(updatedUser));
        updateCartOnBackend(updatedUser);

        return updatedCart;
      });
    } else {
      alert('Please login');
      navigate('/login');
    }
  };
//remove the items from the crat
  const removeFromCart = async (itemid) => {
    const updatedCart = cart.filter((item) => item.id !== itemid);
    setCart(updatedCart);

    if (activeUser) {
      const updatedUser = { ...activeUser, cart: updatedCart };
      setActiveUser(updatedUser);
      localStorage.setItem('activeUserData', JSON.stringify(updatedUser));
      await updateCartOnBackend(updatedUser);
    }
  };


  // cart update on backend 
  const updateCartOnBackend = async (updatedUser) => {
    try {
      await axios.put(http://localhost:4000/Users/${updatedUser.id}, updatedUser);
      console.log('Cart updated successfully on the backend');
   




    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
    
  const byProduct = () => {
    navigate("/payment");
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };  

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  return { cart, setCart, addToCart, activeUser, removeFromCart, byProduct, incrementQuantity, decrementQuantity, updateCartOnBackend };
}

export default UserCart;
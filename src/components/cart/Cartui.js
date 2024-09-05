import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useLogandReg from '../coustom hook/Logincostum';
import './cartui.css';

function Cartui() {
  const [cartproduct, setCartproduct] = useState([]);
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);

  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();

  useEffect(() => {
    setUser(active);
  }, [active]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usere");
        const resData = response.data;
        setCartproduct(resData); 
        console.log("Fetched Cart Data:", resData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData(); 
  }, []);

  useEffect(() => {
    if (user && user.id) {
      const activeUser = cartproduct.find(activeUser => activeUser.id === user.id);
      if (activeUser) {
        setProduct(activeUser.cart);
        console.log("User's Cart:", activeUser.cart);
      }
    }
  }, [cartproduct, user]);

  // Function to handle quantity changes
  const updateQuantity = (id, change) => {
    const updatedProduct = product.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return { ...item, qty: Math.max(newQty, 1) };  // Prevent qty from going below 1
      }
      return item;
    });
    
    setProduct(updatedProduct);  // Update the state
    updateBackendCart(updatedProduct);  // Update the backend with the new cart
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedProduct = product.filter(item => item.id !== id);  // Filter out the item with the given id
    setProduct(updatedProduct);  // Update the state
    updateBackendCart(updatedProduct);  // Update the backend with the new cart
    saveCartToLocalStorage(updatedProduct);  // Update localStorage if necessary
  };

  // Function to update the cart in the backend
  const updateBackendCart = async (updatedCart) => {
    try {
      if (user.id) {
        await axios.put(`http://localhost:3000/usere/${user.id}`, { ...user, cart: updatedCart });
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

  return (
    <div className='pagemaindiv'>
      <div>
        {product.length > 0 ? (
          product.map((item, index) => (
            <div className='cartproductdiv' key={index}>
              <div className='cartimagecontainer'>
                <img src={item.image} alt={item.name} />
              </div>
              <div className='cartitemdetails'>
                <h2>{item.name}</h2>
                <h5>Type: {item.type}</h5>
                <h4>Brand: {item.brand}</h4>
                <span>{item.rating} </span>
                <h6>Reviews: {item.reviews}</h6>
              </div>
              <div className='countbutton'>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                {item.qty}
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              </div>
              <button className='removeitemincart' onClick={() => removeItem(item.id)}>Remove item</button>
            </div>
          ))
        ) : (
          <p>No products in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default Cartui;

import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import useLogandReg from '../coustom hook/Logincostum';
import './cartui.css';
import { Link, useNavigate } from 'react-router-dom';
import { Valuecontext } from '../../App';

function Cartui() {
  const navigate = useNavigate();
  const { value, setValue,displaylgo,setDisplaylog,cartup,setCartup,setCartin } = useContext(Valuecontext);
  const [cartproduct, setCartproduct] = useState([]);
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  // const{cartup,setCartup,setCartin}=useContext(Valuecontext)

  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();
  useEffect(() => {
    setUser(active);
  }, [active]);
  console.log('active user in cart ui', active);

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


  const updateQuantity = (id, change) => {
    const updatedProduct = product.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return { ...item, qty: Math.max(newQty, 1) };
      }
      return item;
    });

    setProduct(updatedProduct);
    updateBackendCart(updatedProduct);
  };

  
  const removeItem = (id) => {
    const updatedProduct = product.filter(item => item.id !== id);
    setProduct(updatedProduct);
    
    updateBackendCart(updatedProduct);
    saveCartToLocalStorage(updatedProduct);
  };

  const totalPrice = product.reduce((total, item) => total + item.price * item.qty, 0);


  const itembuy = () => {
    navigate('/paymentpage');
  };

  useEffect(() => {
    setValue(() => itembuy); 
  }, [setValue]);

  const updateBackendCart = async (updatedCart) => {
    try {
      if (user.id) {
        await axios.put(`http://localhost:3000/usere/${user.id}`, { ...user, cart: updatedCart });
        console.log("Cart updated on backend:", updatedCart);
        setCartup(updatedCart)
        setDisplaylog(cartup)
        console.log("Cart updated on backend in state:",displaylgo );
        

        
      }
    } catch (error) {
      console.error("Error updating cart on backend:", error);
    }
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  setCartin(product);
  return (
    <div className='pagemaindiv'>
      <div>
      <button style={{backgroundColor:'green'}} className='removeitemincart' onClick={itembuy}>Buy item</button>
      <h2>Total Price: {totalPrice}</h2>
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
                <span>{item.rating}</span>
                <h6>Reviews: {item.reviews}</h6>
                <h4>₹ {item.price}</h4>
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
          <div>
            <p>No products in the cart.</p>
            <Link to="/collection" ><button>add product</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cartui;

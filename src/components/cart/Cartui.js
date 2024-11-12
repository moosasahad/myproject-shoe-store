import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import './cartui.css';
import { useNavigate } from 'react-router-dom';
import { MdShoppingCartCheckout } from "react-icons/md";
import { axiosPrivate } from '../../axiosinstance';

function Cartui() {
  const navigate = useNavigate();
  const [cartproduct, setCartproduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await axiosPrivate.get("/getcart");
      setCartproduct(response.data.product);
      console.log("response.data.product",response.data);
      
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []); 

  // Function to update product count
  const updateproductcount = async (id, action) => {
    try {
      await axiosPrivate.post("/updatecartcount", {
        productId: id,
        action: action
      });
      fetchCartData(); 
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  };

  // Function to clear the cart
  const clearCart = async () => {
    try {
      await axiosPrivate.delete("/clearcart");
      setCartproduct([]); 
      setTotalPrice(0); 
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Calculate total price
  useEffect(() => {
    const total = cartproduct.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartproduct]);

  const deletecartitem = async (id) => {
    
    
    try {
      const res = await axiosPrivate.delete("/cartdelete", {
        data: { productId: id }
      });
      
      fetchCartData()
      
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };
  


  return (
    <div className="p-6 space-y-4 mt-16 bg-yellow-100">
      {cartproduct.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center bg-slate-100 shadow-lg rounded-lg p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-6">
          {/* Product Image */}
          <div className="w-full md:w-1/4">
            <img src={item.productId.image} alt={item.productId.name} className="w-full h-32 object-cover rounded-lg" />
          </div>
          
          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{item.productId.name}</h2>
            <p className="text-sm text-gray-500">Type: {item.productId.type}</p>
            <p className="text-sm text-gray-500">Brand: {item.productId.brand}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-semibold">{item.productId.rating}</span>
              <p className="text-xs text-gray-400">Reviews: {item.productId.reviews}</p>
            </div>
            <p className="text-lg font-bold text-gray-800">₹ {item.productId.price}</p>
          </div>
          
          {/* Quantity and Action Buttons */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-lg font-semibold bg-gray-500 hover:bg-gray-700 rounded" onClick={() => updateproductcount(item.productId._id, "increment")}>+</button>
              <span className="text-xl font-bold mt-2">{item.quantity}</span>
              <button className="px-3 py-1 text-lg font-semibold bg-gray-500 hover:bg-gray-700 rounded" onClick={() => updateproductcount(item.productId._id, "decrement")}>-</button>
            </div>
            <button className="bg-red-700 text-white hover:bg-red-800 font-semibold" onClick={() => deletecartitem(item.productId._id)}>Remove</button>

          </div>
        </div>
      ))}
      
      {/* Total Price and Clear Cart */}
      <div className="flex justify-between items-center mt-8">
        <span className="font-bold text-black text-2xl">Total Price: ₹ {totalPrice}</span>
        <div className="space-x-4">
          <button className="m-2 bg-green-600 hover:bg-green-700 p-2 rounded"><MdShoppingCartCheckout /></button>
          <button className="m-2 bg-red-600 hover:bg-red-700 p-2 rounded" onClick={clearCart}><RiDeleteBin6Line /></button>
        </div>
      </div>
    </div>
  );
}

export default Cartui;

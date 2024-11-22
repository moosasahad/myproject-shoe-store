import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdShoppingCartCheckout } from "react-icons/md";
import { axiosPrivate } from "../../axiosinstance";
import { Cartcontext } from "../context/Addcart";

function Cartui() {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const { order, cartproduct, setCartproduct, fetchCartData, loading } =useContext(Cartcontext);

  const updateproductcount = async (id, action) => {
    try {
      await axiosPrivate.post("/updatecartcount", {
        productId: id,
        action: action,
      });
      fetchCartData();
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axiosPrivate.delete("/clearcart");
      setCartproduct([]);
      setTotalPrice(0);
      fetchCartData();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    const total = cartproduct.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartproduct]);

  const deletecartitem = async (id) => {
    try {
      await axiosPrivate.delete("/cartdelete", {
        data: { productId: id },
      });
      fetchCartData();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const orderhandil = () => {
    // order();
    navigate("/Addres");
  };

  return (
   <>
   {loading?(
    <div>
       <div className="flex justify-center items-center h-screen">
       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
     </div>
     </div>
   ):(
   <div>
   {cartproduct.length<=0?(
    <div className="mt-36">
      <div className="flex flex-col items-center justify-center h-full m-5">
          <img
            src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
            alt="Empty Cart"
            className=""
          />
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your cart is empty!
          </h2> */}
          <button
            onClick={() => navigate("/collection")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
    </div>
   ):(
     <div className="min-h-screen p-6 bg-gray-50 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      <div className="space-y-6">
        {cartproduct.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 space-y-4 md:space-y-0 md:space-x-6 border"
          >
            <div className="w-full md:w-1/4">
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                {item.productId.name}
              </h2>
              <p className="text-gray-600">Type: {item.productId.type}</p>
              <p className="text-gray-600">Brand: {item.productId.brand}</p>
              <p className="text-lg font-bold text-green-600">
                ₹ {item.productId.price}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 font-semibold">
                  {item.productId.rating}
                </span>
                <span className="text-gray-500 text-sm">
                  {item.productId.reviews} reviews
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    updateproductcount(item.productId._id, "increment")
                  }
                >
                  +
                </button>
                <span className="text-lg font-semibold">
                  {item.quantity}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    updateproductcount(item.productId._id, "decrement")
                  }
                >
                  -
                </button>
              </div>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                onClick={() => deletecartitem(item.productId._id)}
              >
                <RiDeleteBin6Line className="mr-2" />
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Footer Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border mt-6">
          <span className="text-2xl font-bold text-gray-800">
            Total Price: ₹ {totalPrice}
          </span>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              onClick={orderhandil}
            >
              <MdShoppingCartCheckout className="mr-2" />
              Checkout
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              onClick={clearCart}
            >
              <RiDeleteBin6Line className="mr-2" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
   )}
   </div>
   )}
   </>
  );
}

export default Cartui;

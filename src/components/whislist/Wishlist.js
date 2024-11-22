import React, { useContext, useEffect, useState } from "react";
import { axiosPrivate } from "../../axiosinstance";
import { Cartcontext } from "../context/Addcart";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { handleCart, product, wishlist, loadin } = useContext(Cartcontext);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axiosPrivate.delete("/wishlistremive", {
        data: { productId },
      });
      // console.log("res.wishlist",res);

      wishlist();
    } catch (error) {
      console.log("Error removing product from wishlist", error);
    }
  };

  // const wishlist = async () => {
  //   try {
  //     const res = await axiosPrivate.get("/whislistget");
  //     setProduct(res.data.product);
  //   } catch (error) {
  //     console.log("Error fetching wishlist", error);
  //   }
  // };
  // useEffect(() => {
  //   wishlist();
  // }, []);
  const adtocartformwish = (id) => {
    handleCart(id);
    removeFromWishlist(id);
  };
  const navigate = useNavigate()
  return (
    <>
    {loadin?(
      <div>
         <div className="flex justify-center items-center h-screen">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
       </div>
      </div>
      ):(
      <div>
        {product.length<=0?(
        <div className="mt-36">
        <div className="flex flex-col items-center justify-center h-full m-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLSz1SYhpDvBfqDubCPfMflLOfO9rk87MNhw&s"
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
        <div className="mt-24 px-4 md:px-10 mb-5">
        <h2 className="text-3xl font-bold text-center mb-6">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {product.map((item) => (
            <div
              key={item._id} // Use unique identifier (assuming _id is unique)
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image} // Assuming you have an image property in the item object
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold truncate">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  {item.price}
                </p>
                <button
                  onClick={() => removeFromWishlist(item._id)} // Pass the product _id to the function
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
                <button
                  onClick={() => adtocartformwish(item._id)} // Pass the product _id to the function
                  className="mt-4 px-4 py-2 ml-4 bg-black text-white rounded-full hover:bg-red-600 transition duration-200"
                >
                  Addcart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      </div>
    )}
    </>
  );
}

export default Wishlist;

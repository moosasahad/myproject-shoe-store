import React, { useContext, useState, useEffect } from "react";
import useProducts from "../../coustom hook/Products";
import { Link } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Cartcontext } from "../../context/Addcart";

function Collection() {
  const [product,isloading] = useProducts();
  const { handleCart, whishlist } = useContext(Cartcontext);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-12 bg-gray-50 mt-24">
      
      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        
        
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Collection
      </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
          {product.map((value) => (
            <div
              key={value._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="relative">
                {/* Wishlist & Cart Buttons */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => whishlist(value._id)}
                    className="bg-white text-gray-800 rounded-full shadow-lg hover:bg-red-600 hover:text-green-500 p-1 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button
                    onClick={() => handleCart(value._id)}
                    className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-green-500 transition duration-300 mt-2 ml-2"
                  >
                    <BsCartCheckFill />
                  </button>
                </div>

                {/* Product Image */}
                <img
                  src={value.image}
                  alt={value.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              </div>

              {/* Product Info */}
              <Link
                to={`/productdetails/${value._id}`}
                className="no-underline"
                onClick={() => handleClick()}
              >
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {value.brand}
                  </h5>
                  <h6 className="text-xl font-bold text-gray-900">
                    ₹ {value.price}
                  </h6>
                  <p className="text-gray-600">{value.name}</p>

                  {/* Rating Stars */}
                  <div className="flex items-center mt-2 text-yellow-500">
                    {[...Array(5)].map((_, index) => {
                      if (index < Math.floor(value.rating)) {
                        // Full Star
                        return (
                          <svg
                            key={index}
                            className="w-5 h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 17.75l-3.5 2.75 1-4.5L5 10h4.5L12 5l2.5 5H21l-4.5 6.25 1 4.5z" />
                          </svg>
                        );
                      } else if (
                        index < Math.ceil(value.rating) &&
                        value.rating % 1 !== 0
                      ) {
                        // Half Star
                        return (
                          <svg
                            key={index}
                            className="w-5 h-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 17.75l-3.5 2.75 1-4.5L5 10h4.5L12 5l2.5 5H21l-4.5 6.25 1 4.5z" />
                            <path d="M12 5l-1.5 3h-3l2 1.5-1 4.5 2.5-1.5z" />
                          </svg>
                        );
                      } else {
                        // Empty Star
                        return (
                          <svg
                            key={index}
                            className="w-5 h-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 17.75l-3.5 2.75 1-4.5L5 10h4.5L12 5l2.5 5H21l-4.5 6.25 1 4.5z" />
                          </svg>
                        );
                      }
                    })}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

export default Collection;

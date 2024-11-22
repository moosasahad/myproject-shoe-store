import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Cartcontext } from "../../context/Addcart";
import { Productscontext } from "../../context/ProductCOntext";

function Men() {
  const { menproduct,loading } = useContext(Productscontext);
  const { handleCart, whishlist } = useContext(Cartcontext);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {loading?(
         <div className="flex justify-center items-center h-screen">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
       </div>
      ):(
        <div className="py-12 bg-gray-50 mt-24">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Men's Collection
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
        {menproduct.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="relative">
              {/* Wishlist & Cart Buttons */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => whishlist(product._id)}
                  className="bg-white text-gray-800 rounded-full shadow-lg hover:bg-red-600 hover:text-green-500 p-1 transition duration-300"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button
                  onClick={() => handleCart(product._id)}
                  className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-blue-600 hover:text-green-500 transition duration-300 mt-2 ml-2"
                >
                  <BsCartCheckFill />
                </button>
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
            </div>

            {/* Product Info */}
            <Link
              to={`/productdetails/${product._id}`}
              onClick={() => handleClick()}
              className="no-underline"
            >
              <div className="p-4">
                <h5 className="text-lg font-semibold text-gray-800">
                  {product.brand}
                </h5>
                <h6 className="text-xl font-bold text-gray-900">
                  ₹ {product.price}
                </h6>
                <p className="text-gray-600">{product.name}</p>

                {/* Rating Stars */}
                <div className="flex items-center mt-2 text-yellow-500">
                  {[...Array(5)].map((_, index) => {
                    if (index < Math.floor(product.rating)) {
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
                      index < Math.ceil(product.rating) &&
                      product.rating % 1 !== 0
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

export default Men;

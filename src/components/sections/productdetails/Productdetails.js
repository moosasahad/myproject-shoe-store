import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProducts from "../../coustom hook/Products";
import { BsCartCheckFill } from "react-icons/bs";
import { Cartcontext } from "../../context/Addcart";
import Cookies from "js-cookie";
import "./productdetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Productdetails() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState([]);
  const [menproduct, womenproduct, product, slicedp] = useProducts();
  const { _id } = useParams();
  const navigate = useNavigate();
  const user = Cookies.get("users");
  const { handleCart,whishlist } = useContext(Cartcontext);

  useEffect(() => {
    setState(product);
  }, [product]);

  useEffect(() => {
    if (state.length > 0) {
      const selectedProduct = state.find((product) => product._id == _id);
      setValue(selectedProduct ? [selectedProduct] : []);
    }
  }, [state, _id]);

  const convertToStars = (stars) => {
    const rating = parseFloat(stars);
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="star-rating">
        {"★".repeat(fullStars)}
        {hasHalfStar && <span className="half-star">★</span>}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-12 bg-gray-100 mt-24">
      {value.map((product) => (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24" key={product._id}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg"/>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">{product.name}</h3>
              <h6 className="text-xl text-gray-500">Brand: {product.brand}</h6>
              <p className="text-gray-700">{product.description}</p>
              <div className="flex items-center space-x-2">
                <div className="text-lg text-yellow-500">{convertToStars(product.rating)}</div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
              <h4 className="text-2xl text-gray-900">₹ {product.price}</h4>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleCart(product._id)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate("/paymentpage")}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Related Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
            {product.map((product) => (
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
                    <Link to={`/productdetails/${product._id}`} className="no-underline">
                        <div className="p-4">
                            <h5 className="text-lg font-semibold text-gray-800">{product.brand}</h5>
                            <h6 className="text-xl font-bold text-gray-900">₹ {product.price}</h6>
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
                                    } else if (index < Math.ceil(product.rating) && product.rating % 1 !== 0) {
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
  );
}

export default Productdetails;

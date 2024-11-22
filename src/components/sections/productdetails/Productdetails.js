import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../coustom hook/Products";
import { BsCartCheckFill } from "react-icons/bs";
import { Cartcontext } from "../../context/Addcart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Productscontext } from "../../context/ProductCOntext";
import axiosinstance from "../../../axiosinstance";

function Productdetails() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState([]);
  const [product,isloading] = useProducts();
  const { _id } = useParams();
  const { handleCart, whishlist } = useContext(Cartcontext);
  const { relateproduct, relate } = useContext(Productscontext);

  useEffect(() => {
    setState(product);
  }, [product]);

  useEffect(() => {
    const detalifunction = async () => {
      try {
        const response = await axiosinstance.get(`/productid/${_id}`);
        // console.log("detail response",response.data)
        setValue(response.data);
        relateproduct(response.data.type);
      } catch (error) {
        console.log("detaile page", error);
      }
    };
    detalifunction();
    // if (state.length > 0) {
    //   const selectedProduct = state.find((product) => product._id == _id);
    //   setValue(selectedProduct ? [selectedProduct] : []);
    // }
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
   <>
   {isloading?(
     <div className="flex justify-center items-center h-screen">
     <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
   </div>
   ):(
    <div className="py-12 bg-gray-100 mt-24 ">
    <div
      className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg mb-10"
      key={value._id}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative">
          <img
            src={value.image}
            alt={value.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
          <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded">
            Featured
          </span>
        </div>

        {/* Details Section */}

        <div className="space-y-6">
          <h6 className="text-base text-gray-600">Brand: {value.brand}</h6>
          {/* Product Name */}
          <h3 className="text-4xl font-extrabold text-gray-900">
            {value.name}
          </h3>

          {/* Brand */}
          <h6 className="text-base text-gray-600">Brand: {value.brand}</h6>

          {/* Description */}
          <p className="text-base text-gray-700 leading-relaxed">
            Description: {value.description}
          </p>
          <p>Type: {value.type}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-500 text-lg">
              {convertToStars(value.rating)}
            </div>
            <h4 className="text-sm text-gray-600">
              ({value.reviews} Reviews)
            </h4>
          </div>

          {/* Price */}
          <h4 className="text-3xl font-bold text-blue-600">
            ₹ {value.price}
          </h4>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleCart(value._id)}
              className=" bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-500 transition duration-300 p-2"
            >
              Add to Cart
            </button>
            {/* <button
        onClick={() => navigate("/paymentpage")}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
      >
        Buy Now
      </button> */}
          </div>
        </div>
      </div>
    </div>

    {/* ))} */}

    {/* Related Products Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
      {relate.map((product) => (
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
            className="no-underline"
            onClick={() => handleClick()}
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
   </>
  );
}

export default Productdetails;

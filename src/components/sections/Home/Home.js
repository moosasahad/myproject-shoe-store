import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Productscontext } from "../../context/ProductCOntext";
import { Cartcontext } from "../../context/Addcart";
import myimage from "../../../image/image.webp";

function Home() {
  const { product } = useContext(Productscontext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(product.length / itemsPerPage);
  const { handleCart, whishlist } = useContext(Cartcontext);
  const navigat = useNavigate();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="bg-gray-50">
        <div
          className="bg-cover bg-center h-screen w-full relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 text-white text-center px-6">
              <h1 className="text-5xl font-bold leading-tight">
                Discover the Perfect Shoes <br /> For Every Step You Take
              </h1>
              <div className="mt-6">
                <NavLink
                  to="/men"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mr-4 no-underline"
                >
                  SHOP MEN
                </NavLink>
                <NavLink
                  to="/women"
                  className="bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition duration-300 no-underline"
                >
                  SHOP WOMEN
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-10">
          <h5 className="text-2xl font-semibold text-gray-700">
            As Featured In:
          </h5>
          <div className="flex justify-center space-x-6 mt-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-40">
                <img
                  src={`https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-${
                    index + 1
                  }.svg`}
                  alt={`Brand ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap- justify-evenly align-middle mt-10 mb-8 ">
          <div className="bg-orange-100 p-2 w-72 border rounded-xl shadow-lg flex-wrap justify-center align-middle">
            <img
              className="relative bottom-20 right-2"
              src="https://imgs.search.brave.com/ol4E7mhLxsCnP1OBjN6bkVq6uUHtT0xe17ZceFZd_Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNi8w/My9TaG9lcy1GcmVl/LURvd25sb2FkLVBO/Ry5wbmc"
              alt=""
            />
            <div className="relative bottom-12 mx-auto text-center flex justify-center align-middle">
              <div>
                <h6 className="mb-8">New Collection</h6>
                <span
                  onClick={() => navigat("/collection")}
                  className="bg-transparent text-black border-2 border-black font-semibold rounded-3xl p-2 w-32 cursor-pointer "
                >
                  SHOP NOW >
                </span>
              </div>
            </div>
          </div>
          <div className="bg-orange-100 p-2 w-72 border rounded-xl shadow-lg flex-wrap justify-center align-middle">
            <img
              className="relative bottom-20 right-2"
              src="https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png"
              alt=""
            />
            <div className="relative bottom-12 mx-auto text-center flex justify-center align-middle">
              <div>
                <h6 className="mb-8">Men Collection</h6>
                <span
                  onClick={() => navigat("/men")}
                  className="bg-transparent text-black border-2 border-black font-semibold rounded-3xl p-2 w-32 cursor-pointer "
                >
                  SHOP NOW >
                </span>
              </div>
            </div>
          </div>
          <div className="bg-orange-100 p-2 w-72 border rounded-xl shadow-lg flex-wrap justify-center align-middle">
            <img
              className="relative bottom-20 right-2"
              src="https://parspng.com/wp-content/uploads/2023/02/shoespng.parspng.com_.png"
              alt=""
            />
            <div className="relative bottom-12 mx-auto text-center flex justify-center align-middle">
              <div>
                <h6 className="mb-8">Women Collection</h6>
                <span
                  onClick={() => navigat("/women")}
                  className="bg-transparent text-black border-2 border-black font-semibold rounded-3xl p-2 w-32 cursor-pointer "
                >
                  SHOP NOW >
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center my-10 px-4">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src={myimage}
              alt="Comfort and Style"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 px-6 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">
              Comfort Meets Sustainability
            </h2>
            <p className="mt-4 text-gray-600">
              Crafted from eco-friendly materials, designed for durability, and
              comfort for every step. Our shoes are perfect for all-day wear.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
            >
              <div className="relative">
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
              </div>
              <Link
                to={`/productdetails/${product._id}`}
                className="no-underline"
                onClick={() => handleClick()}
              >
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {product.brand}
                  </h5>
                  <h6 className="text-xl text-gray-900">₹ {product.price}</h6>
                  <p className="text-gray-600">{product.name}</p>

                  {/* Rating */}
                  <div className="flex items-center text-yellow-500">
                    {/* Loop through and display full, half, and empty stars based on rating */}
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

                  {/* Reviews count */}
                  <p className="text-gray-600">{product.reviews} Reviews</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-1 mb-5">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            &lt;
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`py-1 px-3 rounded transition duration-200 ${
                  currentPage === page
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

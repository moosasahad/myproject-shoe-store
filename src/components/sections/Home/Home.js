import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { BsCartCheckFill } from "react-icons/bs";
import useProducts from "../../coustom hook/Products";
import { Productscontext } from "../../context/ProductCOntext";
// Import FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the heart icon
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Cartcontext } from "../../context/Addcart";

function Home() {
  const { product } = useContext(Productscontext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(product.length / itemsPerPage);
  const {value} = useContext(Cartcontext)

  return (
    <>
      <div className=" bg-yellow-100">
        {value?(value):"jmhdkj,shdjk,ashdkjsa,hdkajsh"}
        <div
          className="bg-cover bg-center h-screen w-full relative"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/flat-lay-shoe-with-plain-background-ecommerce-online-shop-concept_734910-740.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>

          {/* Centering container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 text-white text-center p-6">
              <h1 className="text-4xl font-bold">
                Love the Planet <br /> we walk on 
              </h1>
              {/* <h4 className='mt-2 text-lg'>Bibendum fermentum, aenean donec pretium aliquam blandit tempor imperdiet arcu arcu ut nunc in dictum mauris at ut.</h4> */}
              <div className="mt-4">
                <NavLink
                  to="/men"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 no-underline"
                >
                  SHOP MEN
                </NavLink>
                <NavLink
                  to="/women"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ml-4 no-underline"
                >
                  SHOP WOMEN
                </NavLink>
              </div>
            </div>
          </div>
        </div>
       

        <h5 className="text-center my-6 font-semibold p-2">As seen in:</h5>
        <div className="flex justify-center space-x-4">
          {/* Brand logos */}
          {[
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-1.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-2.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-3.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-4.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-5.svg",
          ].map((logo, index) => (
            <div key={index} className="h-16">
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center my-6 p-2">
          <div className="md:w-1/2 p-4">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
              alt="Advertisement"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 p-4">
            <h1 className="text-2xl font-bold">
              Selected materials designed for comfort and sustainability
            </h1>
            <h6 className="mt-2 text-gray-700">
              Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget
              auctor nec sed elit nunc, magna non urna amet ac neque ut quam
              enim pretium risus gravida ullamcorper adipiscing at ut magna.
            </h6>
          </div>
        </div>

        <div className="flex justify-between my-4 p-2">
          <NavLink
            to="/men"
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200"
          >
            MEN SHOP
          </NavLink>
          <NavLink
            to="/women"
            className="bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition duration-200"
          >
            WOMEN SHOP
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-cente p-5">
          {currentProducts.map((value) => (
            <div className="block border max-w-72 bg-gray-100 border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform ">
              <div className="h-14 w-14">
                {/* <span className="absolute top-2 right-11 w-10 h-10 bg-white rounded-full p-6 hover:bg-gray-200">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-gray-500 hover:text-red-500 transition duration-300"
                  />
                </span> */}
                <button className="absolute top-2 right-12 h-8 w-8 pt-2 bg-gray-50 rounded-full p-2 shadow-lg hover:bg-blue-500">
                <FontAwesomeIcon
                    icon={faHeart}
                    className="text-gray-950 mx-auto text-xl"
                  />
                </button>
                {/* cart button */}
                <button className=" absolute top-2 right-2 bg-gray-50 rounded-full p-2 shadow-lg hover:bg-blue-500">
                  <BsCartCheckFill className="text-gray-700 text-xl hover:text-white" />
                </button>
              </div>
              <Link key={value._id} to={`/productdetails/${value._id}`}>
                <div className="relative">
                  <img
                    src={value.image}
                    alt={value.name}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-lg font-semibold">{value.brand}</h5>
                  <h4 className="text-xl text-gray-900">₹ {value.price}</h4>
                  <h6 className="text-gray-600">{value.name}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Next
          </button>
        </div>

        <div className="my-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <h5 className="font-semibold text-lg">
              Eu eget felis erat mauris aliquam mattis lacus, arcu leo aliquam
              sapien pulvinar laoreet vulputate sem aliquet phasellus egestas
              felis, est, vulputate morbi massa mauris vestibulum dui odio.
            </h5>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-recycled-circle-iamge.jpg"
              alt="Recycled"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

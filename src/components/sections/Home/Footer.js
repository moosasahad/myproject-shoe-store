import React from 'react';
import { FaFacebook, FaInstagram, FaLock, FaWhatsapp } from 'react-icons/fa';
import { TbTruckDelivery } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { NavLink } from 'react-router-dom';

function Footer() {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

  return (
    <div className="bg-gray-800 text-white py-1">
        {/* <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
            <div className="flex space-x-8">
                <div className="flex items-center space-x-2">
                    <FaLock className="text-2xl text-yellow-500" />
                    <h5 className="font-semibold">Secure Payment</h5>
                </div>
                <div className="flex items-center space-x-2">
                    <TbTruckDelivery className="text-2xl text-yellow-500" />
                    <h5 className="font-semibold">Express Shipping</h5>
                </div>
                <div className="flex items-center space-x-2">
                    <FiRefreshCw className="text-2xl text-yellow-500" />
                    <h5 className="font-semibold">Free Return</h5>
                </div>
            </div>
        </div> */}
        
        <hr className="my-8 border-gray-600" />
        
        {/* Footer Links and Data */}
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-6">
            {/* About Section */}
            <div>
                <h1 className="text-3xl font-bold text-yellow-500">My-Store</h1>
                <p className="text-gray-400 mt-4">
                    Praesent eget tortor sit risus egestas <br />
                    Nulla pharetra ornare quis <br />
                    Bibendum est bibendum sapien proin nascetur
                </p>
                <div className="flex space-x-4 mt-6">
                    <FaInstagram className="text-2xl hover:text-yellow-500 cursor-pointer" />
                    <FaWhatsapp className="text-2xl hover:text-yellow-500 cursor-pointer" />
                    <FaFacebook className="text-2xl hover:text-yellow-500 cursor-pointer" />
                    <CiTwitter className="text-2xl hover:text-yellow-500 cursor-pointer" />
                </div>
            </div>

            {/* Shop Section */}
            <div>
                <h3 className="text-xl font-semibold text-yellow-500">Shop</h3>
                <ul className="mt-4 text-gray-400">
                    <li>
                        <NavLink to="/" onClick={handleClick} className="hover:text-yellow-500">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/men" onClick={handleClick} className="hover:text-yellow-500">Shop Men</NavLink>
                    </li>
                    <li>
                        <NavLink to="/women" onClick={handleClick} className="hover:text-yellow-500">Shop Women</NavLink>
                    </li>
                    <li>
                        <NavLink to="/collection" onClick={handleClick} className="hover:text-yellow-500">Collection</NavLink>
                    </li>
                </ul>
            </div>

            {/* About Section */}
            <div>
                <h3 className="text-xl font-semibold text-yellow-500">About</h3>
                <ul className="mt-4 text-gray-400">
                    <li>Our Story</li>
                    <li>Our Materials</li>
                    <li>Our Value</li>
                    <li>Sustainability</li>
                    <li>Manufacture</li>
                </ul>
            </div>

            {/* Need Help Section */}
            <div>
                <h3 className="text-xl font-semibold text-yellow-500">Need Help?</h3>
                <ul className="mt-4 text-gray-400">
                    <li>FAQs</li>
                    <li>Shipping & Returns</li>
                    <li>Shoe Care</li>
                    <li>Size Chart</li>
                    <li>Contact Us</li>
                </ul>
            </div>
        </div>
        
        <div className="text-center mt-8 text-gray-400">
            <p>&copy; 2024 My-Store. All rights reserved.</p>
        </div>
    </div>
  );
}

export default Footer;

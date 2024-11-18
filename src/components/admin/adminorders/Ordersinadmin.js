import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaShippingFast, FaMapMarkerAlt } from "react-icons/fa";
import { axiosPrivate } from '../../../axiosinstance';

function FetchBuyingDetails() {
  const [buyingDetails, setBuyingDetails] = useState(null);
  const userId = '3a80'; // The user's ID

  useEffect(() => {
    const fetchBuyingData = async () => {
      try {
        const response = await axiosPrivate.get("admin/orders");
        console.log("admin/orders",response);
        
        // const userBuyingData = response.data
        // setBuyingDetails(userBuyingData);
      } catch (error) {
        console.error('Error fetching buying data:', error);
      }
    };

    fetchBuyingData();
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold">Wed, Aug 13, 2020, 4:34PM</h2>
          <p className="text-sm text-gray-500">#ID 3453012</p>
        </div>
        <div>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2">
            Change Status
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Save
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Customer Info */}
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-600 mr-2" />
            <h3 className="font-semibold">Customer</h3>
          </div>
          <p className="text-sm">John Alexander</p>
          <p className="text-sm text-gray-500">alex@example.com</p>
          <p className="text-sm text-gray-500">+998 99 22123456</p>
          <a href="#" className="text-blue-600 text-sm mt-2 block">
            View profile
          </a>
        </div>

        {/* Shipping Info */}
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="flex items-center mb-4">
            <FaShippingFast className="text-blue-600 mr-2" />
            <h3 className="font-semibold">Customer</h3>
          </div>
          <p className="text-sm">Shipping: Fargo express</p>
          <p className="text-sm text-gray-500">Payment method: Card card</p>
          <p className="text-sm text-gray-500">Status: <span className="text-red-600">Status</span></p>
          <a href="#" className="text-blue-600 text-sm mt-2 block">
            Download
          </a>
        </div>

        {/* Delivery Info */}
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <h3 className="font-semibold">Deliver to</h3>
          </div>
          <p className="text-sm">City: Tashkent, Uzbekistan</p>
          <p className="text-sm text-gray-500">Street: Beruniy 369</p>
          <p className="text-sm text-gray-500">Address: Block A, House 123, Floor 2</p>
          <a href="#" className="text-blue-600 text-sm mt-2 block">
            Open map
          </a>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Unit Price</th>
              <th className="py-2 px-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Supreme helinox chair one</td>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">$43.50</td>
              <td className="py-2 px-4">$87.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Gopro hero 7</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">$43.50</td>
              <td className="py-2 px-4">$87.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Payment Info</h3>
          <p className="text-sm">Master Card **** **** 4768</p>
          <p className="text-sm text-gray-500">Business name: Master Card, inc.</p>
          <p className="text-sm text-gray-500">Phone: +1 (800) 555-154-52</p>
        </div>

        {/* Notes Section */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Notes</h3>
          <textarea
            className="w-full h-20 p-2 border rounded-md"
            placeholder="Type here"
          ></textarea>
          <button className="px-4 py-2 bg-blue-600 text-white mt-2 rounded-md">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default FetchBuyingDetails;

import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../axiosinstance';
import { FaRegCalendar } from "react-icons/fa6";


function FetchBuyingDetails() {
  const [orders,setOrders]=useState([])
  const userId = '3a80'; 
  // setOrderprod()
  // console.log(orders[0].product[0].productId);
  
  useEffect(() => {
    const fetchBuyingData = async () => {
      try {
        const response = await axiosPrivate.get("admin/orders");
        console.log("admin/orders",response.data.orders);
        setOrders(response.data.orders)
        
        // const userBuyingData = response.data
        // setBuyingDetails(userBuyingData);
      } catch (error) {
        console.error('Error fetching buying data:', error);
      }
    };

    fetchBuyingData();
  }, [userId]);
  // console.log(orders);


  return (
    <div className="max-w-7xl mx-auto p-6 bg-orange-100 rounded-xl shadow-md">
  {orders.map((order) => (
    <div key={order._id} className="mb-10 border  p-3 rounded-md shadow-lg bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
        
          <div className='flex'>
          <FaRegCalendar className='mt-1 mr-2' />
          <h2 className="text-lg font-bold">

{new Date(order.purchaseDate).toLocaleString("en-US", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}
</h2>
          </div>
          <p className="text-sm text-gray-500 ml-6">Order ID: #{order._id}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Customer Info */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Customer Info</h3>
          <p className="text-sm">Name: {order.userId?.name}</p>
          <p className="text-sm">Email: {order.userId?.email}</p>
          <p className="text-sm">Phone: {order.userId?.number}</p>
        </div>

        {/* Shipping Info */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Shipping Info</h3>
          <p className="text-sm">Status: {order.shippingStatus}</p>
          <p className="text-sm">Payment: {order.paymentStatus}</p>
          <p className="text-sm">Amount: ₹{order.amount}</p>
        </div>

        {/* Delivery Info */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <p className="text-sm">Street: Beruniy 369</p>
          <p className="text-sm">City: Tashkent</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
            <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left"></th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4 text-left">Unit Price</th>
              <th className="py-2 px-4 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order.product.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4"><img className='w-32' src={product.productId?.image || "N/A"} alt="" /></td>
                <td className="py-2 px-4">{product.productId?.name || "N/A"}</td>
                <td className="py-2 px-4">{product?.quantity || "N/A"}</td>
                <td className="py-2 px-4">₹ {product.productId?.price || 0}</td>
                <td className="py-2 px-4">₹ {(product.productId?.price || 0) * (product?.quantity || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>


  );
}

export default FetchBuyingDetails;

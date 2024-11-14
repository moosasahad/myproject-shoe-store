import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../axiosinstance';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosPrivate.get("/getallorders");
        setOrders(res.data); // Assuming the response data is the orders array
        console.log("Fetched orders:", res);
      } catch (error) {
        console.log("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="mt-24 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-6">Order History</h2>
      <div className="space-y-8">
        {orders.map(order => (
          <div key={order._id} className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <div className="mb-4">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Purchase Date:</strong> {new Date(order.purchaseDate).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> ${order.amount}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Shipping Status:</strong> {order.shippingStatus}</p>
            </div>
            <h3 className="text-xl font-semibold mb-2">Products:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.product.map((item, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4">
                  <img 
                    src={item.productId.image} 
                    alt={item.productId.name} 
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2">
                    <h4 className="font-semibold">{item.productId.name}</h4>
                    <p className="text-gray-600">{item.productId.description}</p>
                    <p className="font-bold mt-1">${item.productId.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

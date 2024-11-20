import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../axiosinstance";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const { sctionId } = useParams();
  // console.log("Session ID", sctionId);

  const verify = async () => {
    try {
      const res = await axiosPrivate.post(`/verifyOrder/${sctionId}`);
      // console.log("Verify Order Response:", res);
      toast.success("payment verifyde");
    } catch (error) {
      console.error("Error verifying the order:", error);
    }
  };

  useEffect(() => {
    verify();
  }, [sctionId]);

  const fetchOrders = async () => {
    try {
      const res = await axiosPrivate.get("/getallorders");
      setOrders(res.data.orders); // Assuming the response data is the orders array
      // console.log("Fetched orders:", res);
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleProductsVisibility = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  // console.log("orders",orders);

  const cancelOrder = async (id) => {
    try {
      const res = await axiosPrivate.post(`/ordercancel/${id}`);
      // console.log(res.data);
      // Assuming the canceled order status is returned
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <div className="mt-24 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-6">Order History</h2>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`border border-gray-300 rounded-lg p-4 shadow-sm ${
              order.status === "canceled" ? "bg-red-100" : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 flex-1">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Purchase Date:</strong>{" "}
                  {new Date(order.purchaseDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Amount:</strong> ${order.amount}
                </p>
                <p>
                  <strong>Payment Status:</strong> {order.paymentStatus}
                </p>
                <p>
                  <strong>Shipping Status:</strong> {order.shippingStatus}
                </p>
                {/* Show "Canceled" label if the order is canceled */}
                {order.status === "canceled" && (
                  <span className="text-red-500 font-semibold">
                    Order Canceled
                  </span>
                )}
              </div>
              {/* First Product Details */}
              {order.product.length > 0 && (
                <div className="flex-shrink-0 w-full lg:w-1/4 bg-white shadow rounded-lg p-4">
                  <img
                    src={order.product[0].productId.image}
                    alt={order.product[0].productId.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="mt-2">
                    <h4 className="font-semibold">
                      {order.product[0].productId.name}
                    </h4>
                    <p className="font-bold mt-1">
                      ${order.product[0].productId.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {order.product[0].quantity}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Button to toggle products */}
            <button
              onClick={() => toggleProductsVisibility(order._id)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
            >
              {expandedOrders[order._id]
                ? "Hide Products"
                : "View All Products"}
            </button>
            {/* Cancel order button */}
            {order.status !== "canceled" && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => cancelOrder(order.sessionID)}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Cancel Order
                </button>
              </div>
            )}

            {/* Products List */}
            {expandedOrders[order._id] && (
              <div className="mt-4">
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
                        <p className="text-gray-600">
                          {item.productId.description}
                        </p>
                        <p className="font-bold mt-1">
                          ${item.productId.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

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
    <div className="mt-16 px-4 md:px-10">
  <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
    Order History
  </h2>
  <div className="space-y-8">
    {orders.map((order) => (
      <div
        key={order._id}
        className={`border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ${
          order.status === "canceled"
            ? "bg-red-50 border-red-300"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Order Details */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex-1 space-y-2">
            <p className="text-gray-700">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-gray-600">
              <strong>Purchase Date:</strong>{" "}
              {new Date(order.purchaseDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Amount:</strong>{" "}
              <span className="text-green-600 font-bold">${order.amount}</span>
            </p>
            <p className="text-gray-600">
              <strong>Payment Status:</strong>{" "}
              <span
                className={`${
                  order.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-600"
                } font-bold`}
              >
                {order.paymentStatus}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Shipping Status:</strong> {order.shippingStatus}
            </p>
            {order.status === "canceled" && (
              <span className="block text-red-500 font-medium">
                Order Canceled
              </span>
            )}
          </div>

          {/* Featured Product */}
          {order.product.length > 0 && (
            <div className="flex-shrink-0 w-full lg:w-1/4 bg-gray-50 rounded-lg shadow-sm p-4">
              <img
                src={order.product[0].productId.image}
                alt={order.product[0].productId.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-3 text-center">
                <h4 className="font-semibold text-gray-800">
                  {order.product[0].productId.name}
                </h4>
                <p className="text-gray-600 mt-1">
                ₹ {order.product[0].productId.price}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {order.product[0].quantity}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <button
            onClick={() => toggleProductsVisibility(order._id)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {expandedOrders[order._id] ? "Hide Products" : "View All Products"}
          </button>
          {order.status !== "canceled" && (
            <button
              onClick={() => cancelOrder(order.sessionID)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Cancel Order
            </button>
          )}
        </div>

        {/* Product List */}
        {expandedOrders[order._id] && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Products:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.product.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300"
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800">
                      {item.productId.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.productId.description}
                    </p>
                    <p className="font-bold mt-1">₹ {item.productId.price}</p>
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

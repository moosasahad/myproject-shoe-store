import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../axiosinstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
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
      console.log("Fetched orders:", res);
    } catch (error) {
      console.log("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const toggleProductsVisibility = (orderId) => {
  //   setExpandedOrders((prev) => ({
  //     ...prev,
  //     [orderId]: !prev[orderId],
  //   }));
  // };
  // console.log("orders",orders);

  const cancelOrder = async (id) => {
    try {
      const res = await axiosPrivate.post(`/ordercancel/${id}`);
      // console.log(res.data);
      // Assuming the canceled order status is returned
      fetchOrders();
      toast.success("Order canceld")
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };
const navigate = useNavigate()
  return (
    <div className="max-w-6xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6 text-center">Order List</h1>
    {orders.length === 0 ? (
      <div className="mt-36">
      <div className="flex flex-col items-center justify-center h-full m-5">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/014/814/239/small/no-order-a-flat-rounded-icon-is-up-for-premium-use-vector.jpg"
            alt="Empty Cart"
            className=""
          />
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your cart is empty!
          </h2> */}
          <button
            onClick={() => navigate("/collection")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
    </div>
    ) : (
      orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg shadow-md p-4 mb-6 bg-white mt-20"
        >
          {/* Order Info */}
          <h2 className="text-lg font-semibold mb-2">Order ID: {order._id}</h2>
          <p className="text-gray-600">
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>
          <p className="text-gray-600">
            <strong>Shipping Status:</strong> {order.shippingStatus}
          </p>
          <p className="text-gray-600">
            <strong>Purchase Date:</strong>{" "}
            {new Date(order.purchaseDate).toLocaleDateString()}
          </p>
  
          {/* Address Info */}
          <h3 className="text-md font-semibold mt-4">Shipping Address</h3>
          <p className="text-gray-600">{order.addres.fullName}</p>
          <p className="text-gray-600">
            {order.addres.street}, {order.addres.city}, {order.addres.state}
          </p>
          <p className="text-gray-600">
            {order.addres.zip}, {order.addres.country}
          </p>
  
          {/* Products */}
          <h3 className="text-md font-semibold mt-4">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.product.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border p-2 rounded-lg"
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-gray-600">
                    <strong>Price:</strong> ₹ {item.productId.price}
                  </p>
                  <p className="text-gray-600">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Total Amount */}
          <h4 className="text-lg font-bold mt-4">
            Total Amount: ₹ {order.amount}
          </h4>
  
          {/* Cancel Order Button */}
          <button
            onClick={() => cancelOrder(order.sessionID)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Cancel Order
          </button>
        </div>
      ))
    )}
  </div>
  
  );
}

export default Orders;
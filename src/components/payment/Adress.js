
                import React, { useState, useEffect, useContext } from "react";
import { Cartcontext } from "../context/Addcart";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../axiosinstance";
import { toast } from "react-toastify";

                const Adress = () => {
                  // State for address form
                  const inital = {
                    fullName: "",
                    street: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "",
                  }
                  const [address, setAddress] = useState(inital);
                const {cartproduct,order} = useContext(Cartcontext)
                console.log("cartCount",cartproduct)
                  // State for user-ordered products
                  const [orderedProducts, setOrderedProducts] = useState([]);
                
                  // Mock fetching user-ordered products
                //   useEffect(() => {
                //     const fetchOrderedProducts = async () => {
                //       // Replace with actual API call
                //       const mockProducts = [
                //         {
                //           id: 1,
                //           name: "Running Shoes",
                //           price: 120.99,
                //           quantity: 2,
                //           image: "https://via.placeholder.com/100",
                //         },
                //         {
                //           id: 2,
                //           name: "Sports T-Shirt",
                //           price: 45.0,
                //           quantity: 1,
                //           image: "https://via.placeholder.com/100",
                //         },
                //       ];
                //       setOrderedProducts(mockProducts);
                //     };
                
                //     fetchOrderedProducts();
                //   }, []);
                
                  // Handle address form changes
                  const handleInputChange = (e) => {
                    const { name, value } = e.target;
                    setAddress((prevAddress) => ({
                      ...prevAddress,
                      [name]: value,
                    }));
                  };
                console.log("address",address);
                
                  // Handle form submission
                  const handleSubmit =async (e) => {
                    e.preventDefault();
                    try {
                        const res = await axiosPrivate.post("addrescontroller",{address:address})
                        console.log("addres res ", res);
                        toast.success("Addres saved")
                    } catch (error) {
                        console.log("addres error",error)
                    }
                  };
                  const navigate = useNavigate()
                const Proceedtopay = ()=>{
                    order();
                    navigate("/paymentpage");
                }
                  return (
                    <div className="container mx-auto p-4 mt-20">
                      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                
                      {/* Address Form */}
                      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md mb-6">
                        <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="fullName"
                            value={address.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="p-2 border rounded-md"
                            required
                          />
                          <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleInputChange}
                            placeholder="Street Address"
                            className="p-2 border rounded-md"
                            required
                          />
                          <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            className="p-2 border rounded-md"
                            required
                          />
                          <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            className="p-2 border rounded-md"
                            required
                          />
                          <input
                            type="number"
                            name="zip"
                            value={address.zip}
                            onChange={handleInputChange}
                            placeholder="ZIP Code"
                            className="p-2 border rounded-md"
                            required
                          />
                          <input
                            type="text"
                            name="country"
                            value={address.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            className="p-2 border rounded-md"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Save Address
                        </button>
                      </form>
                
                      {/* Ordered Products */}
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Your Ordered Products</h3>
                        <div className="space-y-4">
                          {cartproduct.map((product) => (
                            <div
                              key={product.productId._id}
                              className="flex items-center border p-4 rounded-md"
                            >
                              <img
                                src={product.productId.image}
                                alt={product.productId.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="ml-4 flex-1">
                                <h4 className="font-bold">{product.productId.name}</h4>
                                <p>Price: ₹{product.productId.price}</p>
                                <p>Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                          type="submit"
                          onClick={Proceedtopay}
                          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-600"
                        >
                          Proceed to Pay
                        </button>
                    </div>
                  );
                };
                
                export default Adress;
                
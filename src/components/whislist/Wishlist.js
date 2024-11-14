import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../axiosinstance";

function Wishlist() {
  const [product, setProduct] = useState([]);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await axiosPrivate.delete("/wishlistremive", {
        data: { productId },
      });
      console.log("res.wishlist",res);
      
      wishlist();
    } catch (error) {
      console.log("Error removing product from wishlist", error);
    }
  };

  const wishlist = async () => {
    try {
      const res = await axiosPrivate.get("/whislistget");
      setProduct(res.data.product);
    } catch (error) {
      console.log("Error fetching wishlist", error);
    }
  };
  useEffect(() => {
    wishlist();
  }, []);

  return (
    <div className="mt-24 px-4 md:px-10 mb-5">
      <h2 className="text-3xl font-bold text-center mb-6">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {product.map((item) => (
          <div
            key={item._id} // Use unique identifier (assuming _id is unique)
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.image} // Assuming you have an image property in the item object
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold truncate">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
              <p className="text-lg font-bold text-gray-800 mt-2">
                {item.price}
              </p>
              <button
                onClick={() => removeFromWishlist(item._id)} // Pass the product _id to the function
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;

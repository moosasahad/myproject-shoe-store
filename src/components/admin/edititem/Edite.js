import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../../axiosinstance";
import { toast } from "react-toastify";

function Edite() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    name: "",
    type: "",
    brand: "",
    price: "",
    description: "",
    rating: "",
    qty:"1",
    reviews: "",
  };
  const [editProduct, setEditProduct] = useState(initialState);
  const [image,setimage]=useState(null)
  console.log("image",image);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`admin/productid/${id}`);
        const res = response.data.products;
        console.log("Fetched product:", res);
        setEditProduct(res);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const editUpdating = async () => {
      try {
        const formData = new FormData();
        formData.append('image', image); // Append the file
        Object.keys(editProduct).forEach((key) => {
          formData.append(key, editProduct[key]); // Append other fields
        });

        await axiosPrivate.patch(`admin/editproduct/${id}`, formData);
        console.log("This is edited", editProduct);
        navigate(`/details/${id}`);
      } catch (error) {
        console.log(error);
      }
    };

    editUpdating();
  };
  const imgaehandil = (e)=>{
    setimage(e.target.files[0])
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Edit Product</h2>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={handlesubmit} className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={editProduct.image}
              alt="URL is incorrect"
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={imgaehandil}
                className="mt-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editProduct.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={editProduct.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editProduct.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editProduct.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="text"
              id="qty"
              name="qty"
              value={editProduct.qty}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Edite;

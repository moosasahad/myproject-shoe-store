import React, { useState } from 'react';
import './Addproduct.css';
import { axiosPrivate } from '../../../axiosinstance';

function Adproduct() {
  const initial = {
    name: '',
    type: '',
    brand: '',
    description: '',
    price: '',
    qty: '',
  };

  const [product, setProduct] = useState(initial);
  const [image, setImage] = useState(null); // Separate state for the image

  console.log("adproduct items", product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addProduct = async () => {
      try {
        // Create a FormData object
        const formData = new FormData();
        formData.append('image', image); // Append the file
        Object.keys(product).forEach((key) => {
          formData.append(key, product[key]); // Append other fields
        });

        // Send the formData
        console.log("addproduct fisrt ",product);
        const res = await axiosPrivate.post('admin/addproduct', formData);
        console.log("addproduct ",formData);
        

        console.log('Product added:', res);
        alert('Product added successfully');
        setProduct(initial);
        setImage(null); // Reset the image state
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };

    addProduct();
  };

  return (
    <div className="m-5">
    <form 
      className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
      Create Product
      </h2>
  
      <label className="block text-gray-700 font-medium">Image</label>
      <input
        type="file"
        name="image"
        id="image"
        onChange={handleImageChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
  
      <label className="block text-gray-700 font-medium">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={product.name}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
  
      <label className="block text-gray-700 font-medium">Type</label>
      <input
        type="text"
        name="type"
        id="type"
        value={product.type}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
  
      <label className="block text-gray-700 font-medium">Brand</label>
      <input
        type="text"
        name="brand"
        id="brand"
        value={product.brand}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
  
      <label className="block text-gray-700 font-medium">Description</label>
      <textarea
        name="description"
        id="description"
        value={product.description}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        rows="3"
      ></textarea>
  
      <label className="block text-gray-700 font-medium">Qty</label>
      <input
        type="number"
        name="qty"
        id="qty"
        value={product.qty}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
  
      <label className="block text-gray-700 font-medium">Price</label>
      <input
        type="number"
        name="price"
        id="price"
        value={product.price}
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
      />
  
      <input
        type="submit"
        value="Add Product"
        className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 cursor-pointer transition"
      />
    </form>
  </div>
  
  );
}

export default Adproduct;

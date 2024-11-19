import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Admindproductdetails.css'
import { axiosPrivate } from '../../../axiosinstance';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import { MdEdit } from "react-icons/md";

function Admindetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`admin/productid/${id}`); 
        const res = response.data.products;
        console.log("Fetched product:", res);
        setProduct(res); 
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchData();
  }, [id]); 
  const navigate = useNavigate()
  const deleteitem = async (id) => {
    const deliteing = window.confirm("you delete item in list")

    if(deliteing){
      try {
        await axios.delete(`http://localhost:3000/Product/${id}`);
        console.log(`Product with ID ${id} deleted successfully.`);
        
        setProduct(prevProducts => prevProducts.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
      navigate("/products")
    }
    
  }; 
  
  if (!product) {
    return <p>Loading product details...</p>; 
  }
  const editing = (id)=>{
    navigate(`/editing/${id}`)
  }
  const fullStars = Math.floor(product.rating); // Number of full stars
  const halfStar = product.rating % 1 >= 0.5; // Check for a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="p-5">
  <div className="flex flex-wrap lg:flex-nowrap border rounded-xl shadow-md">
    <div className="w-full lg:w-1/3 flex justify-center items-center p-4">
      <img 
        src={product.image} 
        alt={product.name} 
        className="max-w-full rounded-lg object-cover h-auto lg:h-64"
      />
    </div>
    <div className="w-full lg:w-2/3 my-auto font-bold p-4">
      <p className="mb-2">Brand: {product.brand}</p>
      <p className="mb-2">Name: {product.name}</p>
      <p className="mb-2">Type: {product.type}</p>
      <p className="mb-2">Description: {product.description}</p>
      <p className="mb-2">Quantity: {product.qty}</p>
      <p className="mb-2 flex my-auto">Rating:<span className='text-yellow-400 my-auto text-xl'>{ "★".repeat(fullStars)} {halfStar && "☆"}{"☆".repeat(emptyStars)}</span></p>
      <p className="mb-2">Review: {product.reviews}</p>
      <p className="mb-2">Price: {product.price}</p>
      <div className="flex gap-2">
        <button  onClick={()=>navigate(`/editing/${product._id}`)} className="flex bg-transparent text-black border border-gray-500 font-bold">
  <MdEdit className="text-gray-500 m-auto" /> Edit
</button>
<button onClick={()=>navigate("/products")} className="flex bg-transparent text-red-800 border border-gray-500 font-bold">
  <MdOutlineKeyboardArrowLeft className="text-red-600 m-auto" /> back to Products
</button>
        </div>
    </div>
  </div>
</div>

    // <div className='maindivinadmin'>
    //   <div className="product-container">
    //     <div className="image-container">
    //       <img src={product.image} alt={product.name} style={{ width: '250px', height: 'auto', marginBottom:"50px" }} />
    //     </div>
    //     <div className="details-container">
    //       <p>Id: {product.id}</p>
    //       <p>Name: {product.name}</p>
    //       <p>Brand: {product.brand}</p>
    //       <p>Type: {product.type}</p>
    //       <p>Quantity: {product.qty}</p>
    //       <p>Price: {product.price}</p>
    //       <div className="details-button">
    //         <button onClick={()=>{editing(product.id)}}>Edit</button>
    //         <button onClick={ ()=>{deleteitem(product.id)}}>Delete</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Admindetails;

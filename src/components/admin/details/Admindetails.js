import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Admindproductdetails.css'

function Admindetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Product/${id}`); 
        const res = response.data;
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

  return (
    <div className='maindivinadmin'>
      <div className="product-container">
        <div className="image-container">
          <img src={product.image} alt={product.name} style={{ width: '250px', height: 'auto', marginBottom:"50px" }} />
        </div>
        <div className="details-container">
          <p>Id: {product.id}</p>
          <p>Name: {product.name}</p>
          <p>Brand: {product.brand}</p>
          <p>Type: {product.type}</p>
          <p>Quantity: {product.qty}</p>
          <p>Price: {product.price}</p>
          <div className="details-button">
            <button onClick={()=>{editing(product.id)}}>Edit</button>
            <button onClick={ ()=>{deleteitem(product.id)}}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admindetails;

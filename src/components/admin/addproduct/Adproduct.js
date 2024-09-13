import React, { useState } from 'react'
import './Addproduct.css'
import axios from 'axios';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
function Adproduct() {
    const initioal={
        image:'',
        name:'',
        type:'',
        brand:'',
        description:'',
        price:'',
        qty:'',
    }
    const [product, setProduct]=useState(initioal)
    
    console.log("adproduct items", product);

    const handilchange = (e)=>{
        const {name , value} = e.target;
        setProduct({...product, [name]: value});
    }
    const handilsubmit = (e)=>{
        e.preventDefault();

        const editUpdating = async () => {
            try {
              await axios.post(`http://localhost:3000/Product/`, product);              
            } catch (error) {
              console.log(error);
            }
          };
          alert("Product added successfully");

          editUpdating();

          setProduct(initioal)
          
    }
    
  return (
    <div>
    <form action="" className='addproduct-form' onSubmit={handilsubmit}>
        <img src={product.image} alt="" style={{width:'200px',height:'200px'}} />
        <label>image</label>
        <input 
        type="img"
        name='image'
        id='image'
        value={product.image}
        onChange={handilchange}
        required
         />
        <label>Name</label>
        <input  
        type="text" 
        name='name'
        id='name'
        value={product.name}
        onChange={handilchange}
        required
        />
        <label>Type</label>
        <input 
        type="text" 
        name='type'
        id='type'
        value={product.type}
        onChange={handilchange}
        required
        />
        <label>Brand</label>
        <input 
        type="text"
        name='brand' 
        id='brand'
        value={product.brand}
        onChange={handilchange}
        required
        />
        <label>Description</label>
        <input 
        type="text" 
        name='description'
        id='description'
        value={product.description}
        onChange={handilchange}
        required
        />
         <label>qty</label>
        <input 
        type="number" 
        name='qty'
        id='qty'
        value={product.qty}
        onChange={handilchange}
        required
        />
        <label>Price</label>
        <input 
        type="text"
        name='price' 
        id='price'
        value={product.price}
        onChange={handilchange}
        requiredq1  
        />
        
        <input type="submit" />
    </form>
    </div>
  )
}

export default Adproduct

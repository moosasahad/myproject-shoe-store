import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './edit.css'

function Edite() {
    const navigate = useNavigate()
  const { id } = useParams();

  const initialState = {
    name: "",
    type: "",
    image: "",
    brand: "",
    price: "",
    description: "",
    rating: "", // "reating" corrected to "rating"
    reviews: "",
  };
  const [editProduct, setEditProduct] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Product/${id}`);
        const res = response.data;
        console.log("Fetched product:", res);
        setEditProduct(res); // Set the product in the state
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchData();
  }, [id]);
  console.log("fjdhgkjfdhgkjhfdk editing", editProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const editUpdating = async () => {
      try {
        await axios.put(`http://localhost:3000/Product/${id}`, editProduct);
        console.log("this is edited", editProduct);
        
        navigate(`/details/${id}`);
      } catch (error) {
        console.log(error);
      }
    };
    
    editUpdating();
  };


  return (
    <div className="formmaindiv">
      <div className="fromcontiner">
      <form onSubmit={handlesubmit} className="edit-form">
       <div className="productimagediv">
       <img src={editProduct.image} alt="url is incorect" />
       <div className="inputandlabelcontainer" style={{display:'flex',flexDirection:'column'}}>
       <label>image url</label>
        
        <input
          type="img"
          id="image"
          name="image"
          value={editProduct.image}
          onChange={handleChange}
        />
       </div>
       
       </div>
         <label>Name</label>        
        <input
          type="text"
          id="name"
          name="name"
          value={editProduct.name}
          onChange={handleChange}
        />
         <label>Type</label>
        <input
          type="text"
          id="type"
          name="type"
          value={editProduct.type}
          onChange={handleChange}
        />
         <label>Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={editProduct.brand}
          onChange={handleChange}
        />
         <label>Description</label>
        <input
        type="text"
        id="description"
        name="description"
        value={editProduct.description}
        onChange={handleChange}
      />
       <label>Price</label>
      <input
      type="text"
      id="price"
      name="price"
      value={editProduct.price}
      onChange={handleChange}
    />
   <div className="formsubmitbutton">
   <button className="formsubmitbutton" type="submit">submit</button>
   </div>
      </form>
      </div>
    </div>
  );
}

export default Edite;

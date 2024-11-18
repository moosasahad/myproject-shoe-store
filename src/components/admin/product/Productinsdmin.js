import axios from "axios";
import "./productinadmin.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { axiosPrivate } from "../../../axiosinstance";
import { FaPlus } from "react-icons/fa6";





function Productinsdmin() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();


    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Product");
        const res = response.data;
        console.log("admin produc Fetched data:", res);
        setProduct(res);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };
    useEffect(() => {
    fetchData();
  }, []);

  const handleView = (id) => {
    navigate(`/details/${id}`);
  };
  const deleteitem = async (id) => {
    const deliteing = window.confirm("you delete item in list");

    if (deliteing) {
      try {
        await axios.delete(`http://localhost:3000/Product/${id}`);
        console.log(`Product with ID ${id} deleted successfully.`);

        setProduct((prevProducts) =>
          prevProducts.filter((item) => item.id !== id)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const addproduct = () => {
    navigate("/addingproduct");
  };
  
  const deleteproduct = async (id)=>{
    try {
      const res = await axiosPrivate.delete(`admin/deletproduct/${id}`)
      fetchData();
      console.log("delet res",res);
      
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
   
    <div className="m-2 bg-orange-100">
      
     <div className="flex justify-between m-4">
     <h3 className="m-4">Products</h3>
     <button 
     onClick={()=>navigate("/addingproduct")}
     className="h-14 w-40 flex items-center justify-center p-2 bg-blue-600 text-white text-xl hover:bg-blue-600">
  <FaPlus />
  <span className="text-white my-auto text-lg font-semibold ml-2"> Create new</span>
</button>
     </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 ">
      {product.map((product)=>(
        
        <div className="w-60 p-3 border rounded-md shadow-md bg-slate-100 ">
          <Link to={`/details/${product._id}`}>
        <img src={product.image} alt="" />
        </Link>
        <div className="relative bottom-0">
        <p className="text-slate-500">{product.name}</p>
        <span className="text-xl font-bold text-black">₹ {product.price}</span>
        <div className="flex gap-2">
        <button  onClick={()=>navigate(`/editing/${product._id}`)} className="flex bg-transparent text-black border border-gray-500 font-bold">
  <MdEdit className="text-gray-500 m-auto" /> Edit
</button>
<button onClick={()=>deleteproduct(product._id)} className="flex bg-transparent text-red-800 border border-gray-500 font-bold">
  <MdDelete className="text-red-600 m-auto" /> Delet
</button>
        </div>
        </div>
        </div>
     
        ))
      }
     
    </div>
    </div>
  );
}

export default Productinsdmin;

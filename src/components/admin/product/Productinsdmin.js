import axios from 'axios'
import './productinadmin.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Productinsdmin() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleView = (id) => {
    navigate(`/details/${id}`);
  };
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
    }
    
  };

  return (
    <div className='prodectlist'>
      <table className='table' style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', width: '20px', textAlign: 'center' }}>Id</th>
            <th style={{ border: '1px solid black', width: '100px', textAlign: 'center' }}>Image</th>
            <th style={{ border: '1px solid black', width: '150px', textAlign: 'center' }}>Name</th>
            <th style={{ border: '1px solid black', width: '50px', textAlign: 'center' }}>Brand</th>
            <th style={{ border: '1px solid black', width: '50px', textAlign: 'center' }}>Type</th>
            <th style={{ border: '1px solid black', width: '30px', textAlign: 'center' }}>Quantity</th>
            <th style={{ border: '1px solid black', width: '50px', textAlign: 'center' }}>Price</th>
            <th style={{ border: '1px solid black', width: '50px', textAlign: 'center' }}>View</th>
            <th style={{ border: '1px solid black', width: '50px', textAlign: 'center' }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item.id}>
              <td style={{ textAlign: 'center' }}>{item.id}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>
                <img src={item.image} alt="" className='listimage' style={{ width: '50px', height: '50px' }} />
              </td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.name}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.brand}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.type}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.qty}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.price}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>
                <button className='viewbutton' onClick={() => handleView(item.id)}>View</button>
              </td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>
                <button onClick={() => deleteitem(item.id)} className='dellitebutton'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productinsdmin;

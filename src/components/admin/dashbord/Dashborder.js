import React from 'react';
import './Dashborde.css';
import { useNavigate } from 'react-router-dom';

function Dashborder() {
  // Use the context value
  const navigat = useNavigate()

  return (
    <div className='dashbordemaindiv'>
      <div className="productdiv">
       <div className="productimagediv">
       <img src="https://media.cnn.com/api/v1/images/stellar/prod/running-sneakers-women-cnnu.jpg?c=16x9&q=h_438,w_780,c_fill" alt="" />
       </div>
       <h1>Products</h1>
       <button onClick={()=>{navigat('/products')}}>Go to page</button>
      </div>
      <div className="productdiv">
       <div>
       <img  className="productimagediv" src="https://cdn-icons-png.flaticon.com/512/33/33308.png" alt="" />
       </div>
       <h1>Users</h1>
       <button onClick={()=>{navigat('/users')}}>Go to page</button>
      </div>
      <div className="productdiv">
       <div className="productimagediv">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvwDAr-O5M6-xtH-Or1LRbNZon59ZOMBixaQ&s" alt="" />
       </div>
       <h1>orders</h1>
       <button onClick={()=>{navigat('/orders')}}>Go to page</button>
      </div>
    </div>
  );
}

export default Dashborder;

import React from 'react';
import './Dashborde.css';
import { useNavigate } from 'react-router-dom';

function Dashborder() {

  const navigat = useNavigate()

  return (
    <div className='dashbordemaindiv'>
     <div className="contanierindiv">
      <div className='contanierindivimg'>
        <img src="https://t3.ftcdn.net/jpg/06/12/00/18/360_F_612001823_TkzT0xmIgagoDCyQ0yuJYEGu8j6VNVYT.jpg" alt="" />
      </div>
      <div className="containerdetailse">
        <h1>products</h1>
        <button onClick={()=>{navigat('/products')}}>go to products</button>
      </div>
     </div>
     {/* users--------------- */}
     <div className="contanierindiv">
      <div className='contanierindivimg'>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" />
      </div>
      <div className="containerdetailse">
        <h1>users</h1>
        <button onClick={()=>{navigat('/users')}}>go to users</button>
      </div>
     </div>
     {/* orders-------------- */}
     {/* <div className="contanierindiv">
      <div className='contanierindivimg'>
        <img src="https://www.vardells.co.uk/wp-content/uploads/2018/07/order.jpg" alt="" />
      </div>
      <div className="containerdetailse">
        <h1>Orders</h1>
        <button onClick={()=>{navigat('/orders')}}>go to orders</button>
      </div>
     </div> */}
    </div>
  );
}

export default Dashborder;

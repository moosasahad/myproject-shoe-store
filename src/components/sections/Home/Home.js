import React, { useEffect, useState } from 'react'
import './Home.css'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { BsCartCheckFill } from "react-icons/bs";
import Footer from './Footer';
import useProducts from '../../coustom hook/Products';


function Home() {
  const[menproduct,womenproduct,product,slicedp]=useProducts()
  return (
    <div className='maincontainner'>
      <div className='mainimagediv'>
        <div className='mainimagedivcontent'>
        <h1>
        Love the Planet 
        <br />
        we walk on
        </h1>
        <h4>
        Bibendum fermentum, aenean donec pretium aliquam blandit
        <br />
         tempor imperdiet arcu arcu ut nunc in dictum mauris at ut.
        </h4>
        <div className='mainimagedivbutton'>
        <NavLink to="/men" className='homecategerybutton'>SHOP MEN</NavLink>
        <NavLink to="/women" className='homecategerybutton'>SHOP WOMEN</NavLink>
        </div>
        </div>
      </div>
      <h5 style={{textAlign:'center'}}>As seen in:</h5>
      <div className='brands'>
        
          <div>
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-5.svg" alt="" />
          </div>
          <div>
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-4.svg" alt="" />
          </div>
          <div>
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-3.svg" alt="" />
          </div>
          <div>
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-2.svg" alt="" />
          </div>
          <div>
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-1.svg" alt="" />
          </div>
        </div>
        <div className='prodectadds'>
          <div className='prodectaddsimg'>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D" alt="" />
          </div>
          <div className='imagedetails'>
            <h1>
            Selected materials <br />designed for comfort <br /> and sustainability
            </h1>
            <br />
            <h6>
            Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget auctor nec sed elit nunc, magna non urna amet ac neque ut quam enim pretium risus gravida ullamcorper adipiscing at ut magna
            </h6>
          </div>
        </div>
              
      <div className='homecategarydiv'>
        <div className='leftsectio'>
          <NavLink to="/men" className='shoppingbutton'> MEN SOHP </NavLink>
        </div>
        <div className='rightsection'>
        <NavLink to="/women"  className='shoppingbutton'> WOMEN SOHP </NavLink>
        </div>
      </div>
      <div className='listproducts'>
       
       <div className='productrow'>
          {slicedp.map((value,index)=>(
            <Link  className='navigatelink' to={`/productdetails/${value.id}`}>
            <div className='singleproductdiv'>
              <button className='kartbutton'><BsCartCheckFill />
              </button>
              <img src={value.image} alt="" className='productimage' />
              <Link to="/women"><h6 className='hidenid'>{value.id}</h6></Link>
              <h5>{value.brand}</h5>
              <h4><span>₹ - </span>{value.price}</h4>
              <h6>{value.name}</h6>
            </div>
             </Link>
          ))}
          
        </div>
      

      </div>
      <div className='resyclipost'>
        <div className='contents'>
          <h5>
          Eu eget felis erat mauris aliquam mattis lacus, arcu leo <br /> aliquam sapien pulvinar laoreet vulputate sem <br /> aliquet phasellus egestas felis, est, vulputate morbi <br /> massa mauris vestibulum dui odio.
          </h5>
          <div className='contentsimg'>
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-3.svg" alt="" />
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-2.svg" alt="" />
            <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg" alt="" />

          </div>
        </div>
        <div className='images'>
          <img src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-recycled-circle-iamge.jpg" alt="" />
        </div>

      </div>
    </div>
    
  )
}

export default Home

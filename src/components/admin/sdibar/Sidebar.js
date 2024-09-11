import React, { useState } from 'react';
import './sidebar.css'; 
import { PiListDashesBold } from "react-icons/pi";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard'); // Track active item

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (item) => {
    setActiveItem(item); // Set active item
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <ul className="sidebar-menu">
        <li onClick={toggleSidebar} className="toggle-icon">
          <PiListDashesBold />
        </li>
        <Link to="/" className='sidericonlink'>
        <div
          className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleItemClick('dashboard')}
        >
          
          <MdSpaceDashboard />
          {isExpanded && <span>Dashboard</span>}
          
        </div>
        </Link>
        <Link to="/products" className='sidericonlink'>
        <div
          className={`sidebar-item ${activeItem === 'products' ? 'active' : ''}`}
          onClick={() => handleItemClick('products')}
        >
          <AiFillProduct />
          {isExpanded && <span>Products</span>}
        </div>
        </Link>
       <Link to="/users" className='sidericonlink'>
       <div
          className={`sidebar-item ${activeItem === 'users' ? 'active' : ''}`}
          onClick={() => handleItemClick('users')}
        >
          <FaUser />
          {isExpanded && <span>Users</span>}
        </div>
       </Link>
        <Link to="/orders" className='sidericonlink'>
        <div
          className={`sidebar-item ${activeItem === 'orders' ? 'active' : ''}`}
          onClick={() => handleItemClick('orders')}
        >
          <FaCartFlatbed />
          {isExpanded && <span>Orders</span>}
        </div>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;

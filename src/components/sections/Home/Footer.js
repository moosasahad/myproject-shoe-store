import React from 'react'
import './footer.css'
import { FaLock } from 'react-icons/fa'
import { TbTruckDelivery } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
function Footer() {
  return (
    <div className='footermaindiv'>
        <div className='footerspecification'>
        <FaLock /> <h5>Secure Payment</h5>
        <TbTruckDelivery /> <h5>Express Shipping</h5>
        <FiRefreshCw /> <h5>Free Return</h5>
        </div>
        <hr />
      
    </div>
  )
}

export default Footer

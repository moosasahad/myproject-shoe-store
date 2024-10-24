import React from 'react'
import './footer.css'
import { FaFacebook, FaInstagram, FaLock, FaWhatsapp } from 'react-icons/fa'
import { TbTruckDelivery } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
function Footer() {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
  return (
    <div className='footermaindiv'>
        <div className='footerspecification'>
        <div className='foterfeterdiv'><FaLock /> <h5>Secure Payment</h5></div>
        <div className='foterfeterdiv'><TbTruckDelivery /> <h5>Express Shipping</h5></div>
        <div className='foterfeterdiv'><FiRefreshCw /> <h5>Free Return</h5></div>
        </div>
        <hr />
        <div className='footerlinksanddatas'>
            <div footeraboutdata>
                <h1>My-Store</h1>
                <h6>
                Praesent eget tortor sit risus egestas <br /> nulla pharetra ornare quis <br /> bibendum est bibendum <br /> sapien proin nascetur
                </h6>
                <div className='footerlinkicon'>
                <FaInstagram />
                <FaWhatsapp />
                <FaFacebook />
                <CiTwitter />

                </div>
            </div>
            <div>
                <h3>Shop</h3>
                <h6>
                <NavLink to='/' onClick={handleClick}>Home</NavLink> <br />
                    <NavLink to='/men' onClick={handleClick}>shop men</NavLink> <br />
                    <NavLink to='/women' onClick={handleClick}>Shop Women</NavLink> <br />
                    <NavLink to='/collection' onClick={handleClick}>Collection</NavLink>
                </h6>
            </div>
            <div>
                <h3>About</h3>
                <h6>Our Story <br />
                Our Materials <br />
                Our Value <br />
                Sustainability <br />
                Manufacture</h6>
            </div>
            <div>
                <h3>Need Help?</h3>
                <h6>
                FAQs <br />
                Shipping & Returns <br />
                Shoe Care <br />
                Size Chart <br />
                Contact Us <br />
                </h6>

            </div>
        </div>
      
    </div>
  )
}

export default Footer

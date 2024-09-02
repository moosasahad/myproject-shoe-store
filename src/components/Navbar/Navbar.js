import React from 'react'
import { Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import './Navbare.css'
import { NavLink } from 'react-router-dom';

function Navbare() {
  return (
    <div>
          <Navbar className='navbardiv' bg="success" expand="lg">
      <Navbar.Brand href="#home" className="ms-5">My-shoe</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        <Form inline className=" searchbar d-flex ms-auto">
          <FormControl  type="text" placeholder="Search" className="inputt me-1 my-auto" />
          <button className=" button my-auto  me-3">Search</button>
          <NavLink to="/cart" className='cartlink my-auto'>
          <FaShoppingCart className='cart' />
            </NavLink>
            <NavLink to="/loginpage" className='accountlink my-auto'>
            <MdAccountCircle className='accounticon me-5 my-auto'/>
            </NavLink>
        </Form>
      </Navbar.Collapse>
    </Navbar>
      
    </div>
  )
}

export default Navbare

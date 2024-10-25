import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Offcanvas,
}
from "react-bootstrap";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbare.css";
import { NavLink } from "react-router-dom";
import useLogandReg from "../coustom hook/Logincostum";
import { Valuecontext } from "../../App";
import axios from "axios";

function Navbare() {
  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();
  const{cartin,login,logout}=useContext(Valuecontext)
  const [state,setState]=useState([])
  // useEffect(()=>{
  //   setState(login)
  // },[login])
  console.log("fkjdhkjsf fetched ",)
 
  console.log(" cart value in cartui context",cartin.length);
  // console.log("cart navar icon login name",login.name);
  // console.log("navbar login in active ",active.name);
  
  

  return (
    <div>
      <Navbar expand="md" className="nabardivsize bg-dark mb-3">
        <Container fluid>
          <NavLink to='/' className="storename me-5">My Store</NavLink>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="nvaigatlinksdiv justify-content-start flex-grow-1 pe-3">
                <NavLink to="/" className="nvaigatlinks">
                  Home
                </NavLink>
                <NavLink to="/men" className="nvaigatlinks">
                  Men
                </NavLink>
                <NavLink to="/women" className="nvaigatlinks">
                  Women
                </NavLink>
                <NavLink to="/collection" className="nvaigatlinks">
                  Collection
                </NavLink>
              </Nav>
              <Form inline className="searchbar d-flex ms-auto">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="inputt me-1 my-auto"
                />
                <button className="button my-auto me-3">Search</button>
                <NavLink to="/cartui" className="cartlink my-auto">
                  <FaShoppingCart className="cart" />
                  {active?cartin.length:''}
                </NavLink>
                <NavLink to="/login" className="accountlink my-auto">
                  <MdAccountCircle className="accounticon me-5 my-auto" />
              {active?active.name:''}
                </NavLink>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbare;

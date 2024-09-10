import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Offcanvas,
} from "react-bootstrap";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbare.css";
import { NavLink } from "react-router-dom";

function Navbare() {
  return (
    <div>
      <Navbar expand="md" className=" nabardivsize bg-success mb-3">
        <Container fluid>
          <NavLink className="storename">My Store</NavLink>
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
              <Nav className=" nvaigatlinksdiv justify-content-start flex-grow-1 pe-3">
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
              <Form inline className=" searchbar d-flex ms-auto">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="inputt me-1 my-auto"
                />
                <button className=" button my-auto  me-3">Search</button>
                <NavLink to="/cartui" className="cartlink my-auto">
                  <FaShoppingCart className="cart" />
                </NavLink>
                <NavLink to="/login" className="accountlink my-auto">
                  <MdAccountCircle className="accounticon me-5 my-auto" />
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

import React, { useContext, useEffect, useState } from "react";
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
import useLogandReg from "../coustom hook/Logincostum";
import { Valuecontext } from "../../App";

function Navbare() {
  const [handleChange, inputValue, handleSubmit, active, setActive] = useLogandReg();
  const [state, setState] = useState("");
  const [cart, setCart] = useState([]);
  const { displaylgo } = useContext(Valuecontext);

  useEffect(() => {
    setCart(displaylgo);
  }, [displaylgo]);

  useEffect(() => {
    if (!displaylgo.length) {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        try {
          const parsedCart = JSON.parse(localCart);
          setCart(parsedCart || []); 
        } catch (error) {
          console.error("Error parsing cart data from localStorage:", error);
          setCart([]);
        }
      }
    }
  }, []);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("inputValue");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setState(userData.name || ""); // Set the user's name
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setState("");
      }
    }
  }, [active]);

  return (
    <div>
      <Navbar expand="md" className="nabardivsize bg-dark mb-3">
        <Container fluid>
          <NavLink className="storename me-5">My Store</NavLink>
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
                  {cart.length > 0 && <span className="cart-count">({cart.length})</span>}
                </NavLink>
                <NavLink to="/login" className="accountlink my-auto">
                  <MdAccountCircle className="accounticon me-5 my-auto" />
                  {state && <span>{state}</span>}
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

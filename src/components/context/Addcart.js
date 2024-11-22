import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../axiosinstance";

export const Cartcontext = createContext();
function Addcart({ children }) {
  const navigate = useNavigate();
  const user = Cookies.get("users");
  const [clientSecret, setClientSecret] = useState(null);
  const [sessionID, setsessionID] = useState(null);
  const [cartproduct, setCartproduct] = useState([]);
  const [cartCount, setCartcount] = useState(null);
  const [product, setProduct] = useState([]);
  const [wishCount, setwishcount] = useState(null);
  const [loading,setloadin] = useState(true)
useEffect(()=>{
  if(!user){
    setCartcount(null)
    setwishcount(null)
    setProduct([])
  }
})
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const fetchCartData = async () => {
    try {
      const response = await axiosPrivate.get("/getcart");
      setCartproduct(response.data.product);
      // console.log("response.data.product",response.data);
      setCartcount(response.data.product.length);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }finally {
      setloadin(false)
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [user]);

  const handleCart = async (productId) => {
    if (!user) {
      toast.warning("Place login");
      handleClick()
      navigate("/login");

    } else {
      try {
        const response = await axiosPrivate.post("/addcart", { productId });
        fetchCartData();
        if (response.data == "product quantity increased") {
          toast.success("Product already in Cart");
        } else {
          toast.success("Product added to cart");
        }

        // console.log("Response:", response.data);
      } catch (error) {
        console.error("There was an error adding the product to cart:", error);
      }
    }
  };

  //wishlish ....

  const whishlist = async (productId) => {
    // console.log("jkahsdjkas", user);
    if (!user) {
      toast.warning("Place login");
      
      navigate("/login");
      handleClick()
    } else {
      try {
        const response = await axiosPrivate.post("/wishlist", { productId });
        wishlist();
        if (response.data.message == "products already added to the wishlist") {
          toast.success("Product already in wishlist");
        } else {
          toast.success("Product added to whislist");
        }

        // console.log("Response:", response);
      } catch (error) {
        console.error("There was an error adding the product to cart:", error);
      }
    }
  };

  // order ------

  const order = async () => {
    try {
      const res = await axiosPrivate.post("/order");
      console.log("order")
      
      console.log("order res",res.data.data);
      setClientSecret(res.data.data.clientsecret);
      setsessionID(res.data.data.order.sessionID);
    } catch (error) {
      console.log("error roder", error);
    }
  };
  // console.log("setClientSecret",clientSecret)

  const wishlist = async () => {
    try {
      const res = await axiosPrivate.get("/whislistget");
      setProduct(res.data.product);
      setwishcount(res.data.product.length);
    } catch (error) {
      console.log("Error fetching wishlist", error);
    } finally {
      setloadin(false)
    }
  };
  useEffect(() => {
    wishlist();
  }, [user,cartproduct]);
  return (
    <Cartcontext.Provider
      value={{
        handleCart,
        whishlist,
        order,
        clientSecret,
        sessionID,
        cartproduct,
        setCartproduct,
        fetchCartData,
        cartCount,
        product,
        wishlist,
        wishCount,
        loading,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}

export default Addcart;

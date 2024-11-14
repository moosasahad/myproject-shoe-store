import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../../axiosinstance'

export const Cartcontext = createContext()
function Addcart({children}) {
    const navigate = useNavigate()
    const user = Cookies.get("users")
    const [clientSecret,setClientSecret]=useState(null)



    const handleCart = async (productId) => {
        console.log("jkahsdjkas",user);
        if(!user){
          toast.error("Place login")
          navigate("/login")
            }else{
              try {
                const response = await axiosPrivate.post(
                  "/addcart",
                  { productId }
                );
                if(response.data == "product quantity increased"){
                  toast.success("Product already in Cart");
                }else{
                  toast.success("Product added to cart");
                }
          
                console.log("Response:", response.data);
                
              } catch (error) {
                console.error("There was an error adding the product to cart:", error);
              }
            }
      };


      //wishlish ....


      const whishlist = async (productId) => {
        console.log("jkahsdjkas",user);
        if(!user){
          toast.error("Place login")
          navigate("/login")
            }else{
              try {
                const response = await axiosPrivate.post(
                  "/wishlist",
                  { productId }
                );
                if(response.data.message == "products already added to the wishlist"){
                  toast.success("Product already in wishlist");
                }else{
                  toast.success("Product added to whislist");
                }
          
                console.log("Response:", response);
                
              } catch (error) {
                console.error("There was an error adding the product to cart:", error);
              }
            }

      };

      // order ------

      const order = async ()=>{
        try {
          const res =await axiosPrivate.post("/order")
          console.log("order res",res.data);
          setClientSecret(res.data.data.clientsecret)
          
        } catch (error) {
          console.log("error roder",error);
          
          
        }
    
      }
      console.log("setClientSecret",clientSecret)

      
    return (
        <Cartcontext.Provider value={{handleCart,whishlist,order,clientSecret}}>
            {children}
        </Cartcontext.Provider>
      )
}

export default Addcart


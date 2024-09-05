import { useState, useEffect, useContext   } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from './CustomLogin';
import { MyContext } from '../contextFolder/AllContext';


function UserCart() {

  const navigate = useNavigate();
  
               
               const {activeUser}=UserProvider()
            
                      //  const{activeUser}= useContext(MyContext)
                        

               console.log("on useCart",activeUser);
               const [cartItems,setCartItems]=useState([])

               useEffect(()=>{
                if(activeUser){
                  const  cardItemsChanges=async ()=>{
                    try {
                      let response= await axios.get(http://localhost:4000/Users/${activeUser.id});
                    setCartItems(response.data.cart)
                    } catch (error) {
                      alert(error)
                    }
                   }
                   cardItemsChanges()
                }
               
               },[activeUser])
               
 
  const addToCart = async (product) => {
    console.log("my product",product);
    
           if(activeUser){ 
      const itemWithQty={...product,qty:1  }
           let response= await axios.get(http://localhost:4000/Users/${activeUser.id})
       let currentUserOnDB= response.data
       console.log("userCart",currentUserOnDB.cart);
       
    
       
   let existingItem= currentUserOnDB.cart.find((item)=>item.id===product.id);
   if(existingItem){
    alert("this item is already in your cart")
   }else{

     const updatedItem=[...currentUserOnDB.cart,itemWithQty]
     console.log("updatedUser",updatedItem);
     await axios.put(http://localhost:4000/Users/${activeUser.id},{
      ...currentUserOnDB,cart:updatedItem
     })
     setCartItems(updatedItem)

   }
            
            }else{
              navigate("/login")
              alert("please login")
            }
  };


  const removeFromCart=async (itemId,index)=>{
       try {
        let response= await  axios.get(http://localhost:4000/Users/${activeUser.id});
      let userData=response.data;
            console.log(userData);
            let updatedCart=userData.cart.filter((item)=>item.id!==itemId)
            console.log(updatedCart);
            await axios.patch(http://localhost:4000/Users/${activeUser.id},{
               ...userData,cart:updatedCart
           })
           let newCartItems=[...updatedCart]
           newCartItems.slice(index,1)
           setCartItems(newCartItems)
       } catch (error) {
        console.error("Error eemoving items from the cart",error)
        
       }
  }


  return {addToCart,cartItems,removeFromCart };
}

export default UserCart;
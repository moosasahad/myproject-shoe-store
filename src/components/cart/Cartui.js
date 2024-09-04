import React, { useEffect, useState } from 'react'


function Cartui() {
   
    const [state,setState] =useState([])
   useEffect(()=>{
    const data = (localStorage.getItem("cartitem"));
    console.log("localcart",state)
    setState(data)
   },[state])
    
  return (
    <div>
      {
       state.map()
      }
      cartui
    </div>
  )
}

export default Cartui

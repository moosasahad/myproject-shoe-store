import React from 'react'
import Cart from './Cart'

function Cartui() {
    const[addcart,cart]=Cart()
    console.log("crtui",cart);
    
  return (
    <div>
      {
        cart.map(value=>(
            <h1>
                {value.id}
            </h1>
        ))
      }
      cartui
    </div>
  )
}

export default Cartui

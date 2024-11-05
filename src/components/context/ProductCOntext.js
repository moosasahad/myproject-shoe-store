
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const Productscontext = createContext();
function ProductCOntext({children}) {
    const [product,setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/product");
            setProducts(response.data);
            console.log("response.data",response.data);
            
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <Productscontext.Provider value={{product}}>
        {children}
    </Productscontext.Provider>
  )
}

export default ProductCOntext


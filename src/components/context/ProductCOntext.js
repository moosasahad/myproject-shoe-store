
// import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import axiosinstance from '../../axiosinstance';

export const Productscontext = createContext();
function ProductCOntext({children}) {
    const [product,setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosinstance.get("/product");
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


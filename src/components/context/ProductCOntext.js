import React, { createContext, useEffect, useState } from "react";
import axiosinstance from "../../axiosinstance";

export const Productscontext = createContext();
function ProductCOntext({ children }) {
  const [product, setProducts] = useState([]);
  const [menproduct, setMenproduct] = useState([]);
  const [womenproduct, setWomenproduct] = useState([]);
  const [relate, setRelate] = useState([]);
  const [loading,setloadin]= useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosinstance.get("/product");
        const menrespons = await axiosinstance.get("/product/men");
        const womenresponse = await axiosinstance.get("/product/women");

        // console.log("menrespons",menrespons.data);
        // console.log("womenresponse",womenresponse.data);
        setMenproduct(menrespons.data);
        setWomenproduct(womenresponse.data);

        setProducts(response.data);
        // console.log("response.data",response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setloadin(false)
      }
    };

    fetchData();
  }, []);

  const relateproduct = async (type) => {
    try {
      const response = await axiosinstance.get(`/product/${type}`);
      // console.log("response",response.data);
      setRelate(response.data);
    } catch (error) {
      console.log("relate product ", relateproduct);
    }
  };

  return (
    <Productscontext.Provider
      value={{ product, menproduct, womenproduct, relateproduct, relate,loading }}
    >
      {children}
    </Productscontext.Provider>
  );
}

export default ProductCOntext;

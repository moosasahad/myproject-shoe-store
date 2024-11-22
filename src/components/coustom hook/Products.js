import React, { useEffect, useState } from "react";
import axiosinstance from "../../axiosinstance";

function useProducts() {
  const [product, setProduct] = useState([]);
  const [isloading,setisloading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosinstance.get("/product");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally{
        setisloading(false)
      }
    };

    fetchData();
  }, []);

  return [product,isloading];
}

export default useProducts;

import React, { useEffect, useState } from "react";
import axiosinstance from "../../axiosinstance";

function useProducts() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosinstance.get("/product");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return [product];
}

export default useProducts;

import React, { useEffect,useState } from 'react'
import axios from 'axios'


function useProducts() {

    const[menproduct, setMenproduct]=useState([])
    const[womenproduct, setWomenproduct]=useState([])
    const[product, setProduct]=useState([])
    const[slicedp,setSlicedp]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/product");
        const menProducts = res.data.filter(Product => Product.type === "men");
        const womenproduct = res.data.filter(Product => Product.type === "women");
        const slicproduct = res.data.slice(4,12);
        setMenproduct(menProducts);
        setWomenproduct(womenproduct)
        setProduct(res.data)
        setSlicedp(slicproduct)
        console.log(menProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return [menproduct,womenproduct,product,slicedp]
}

export default useProducts

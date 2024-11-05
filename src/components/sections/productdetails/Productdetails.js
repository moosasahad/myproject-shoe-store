import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../coustom hook/Products';
import './productdetails.css';
import { BsCartCheckFill } from 'react-icons/bs';
import Cart from '../../cart/Cart';
import useLogandReg from '../../coustom hook/Logincostum';
import Cookies from 'js-cookie'
import axios from 'axios';

function Productdetails() {
    const  [addcart] =Cart()

    const [state, setState] = useState([]);
    const [value, setValue] = useState([]);

    const [menproduct, womenproduct, product, slicedp] = useProducts();
    const [handleChange, inputValue, handleSubmit, setActive] = useLogandReg()
    const { _id } = useParams();
const navigate = useNavigate()
const active = Cookies.get("user")
const token = Cookies.get("token"); 
console.log("token",token);

const handleCart = async (productId) => {
    const token = Cookies.get("token");  // Make sure to use the correct key for the token
  
    console.log("product1", productId);
  
    if (active) {
      console.log("product2", productId);
      
      if (!active) {
        alert("Please log in first");
        navigate("/login");
        return;
      }
  
      try {
        console.log("product3", productId);
        const response = await axios.post(
            "http://localhost:3000/addcart",
            { productId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                
                  // Pass the token in headers
              },
            }
          );
          
          
        console.log("Response:", response.data);
        alert("Product added to cart successfully");
      } catch (error) {
        console.error("There was an error adding the product to cart:", error);
      }
    } else {
      alert("Please log in first");
      navigate("/login");
    }
  };
    useEffect(() => {
        setState(product);
    }, [product]); 

    useEffect(() => {
        if (state.length > 0) {
            const selectedProduct = state.find((product) => product._id == _id);
            setValue(selectedProduct ? [selectedProduct] : []);
        }
    }, [state, _id]);

    const convertToStars = (stars) => {
        const rating = parseFloat(stars);
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <span className="star-rating">
                {'★'.repeat(fullStars)} 
                {hasHalfStar && <span className="half-star">★</span>}
                {'☆'.repeat(emptyStars)}
            </span>
        );
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    

    return (
        <div>
            {value.map(product => (
                <div className='pdetalsmain' key={product._id}>
                    <div>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className='productdetailsdiv'>
                        <h6>Brand Name: {product.brand}</h6>
                        <h3>{product.name}</h3>
                        <h6>Description: {product.description}</h6>
                        <h5>Type: {product.type}</h5>
                        <h5>Stock: {product.qty}</h5>
                        <span>{product.rating} {convertToStars(product.rating)}</span> 
                        <span>Reviews: {product.reviews}</span>
                        <h4>₹  {product.price}</h4>
                        <div className='broductdivbutton'>
                            <button onClick={()=>handleCart(product._id)}>Add to Cart</button>
                            <button onClick={()=>{navigate('/paymentpage')}}>Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
          
            <div className='listproducts'>
                <h1 style={{textAlign: 'center'}}>Related products</h1>
                <div className='productrow'>
                    {slicedp.map((product, index) => (
                        <div>
                            <Link 
                            key={product._id} 
                            className='navigatelink' 
                            to={`/productdetails/${product._id}`} 
                            onClick={handleClick}
                        >
                            <div className='singleproductdiv'>
                                <button className='kartbutton' onClick={()=>handleCart(product._id)}>
                                    <BsCartCheckFill />
                                </button>
                                <img src={product.image} alt={product.name} className='productimage' />
                                <h5>{product.brand}</h5>
                                <h4><span>₹ - </span>{product.price}</h4>
                                <h6>{product.name}</h6>
                            </div>
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Productdetails;

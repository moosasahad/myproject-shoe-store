import React from 'react'
import useProducts from '../../coustom hook/Products'
import { Link } from 'react-router-dom'
import { BsCartCheckFill } from 'react-icons/bs'

function Collection() {
    const[menproduct,womenproduct,product]=useProducts()
    return (
        <div className='menmaindiv'>
            <h1 className='hedding'>Collection</h1>
    
            <div className='menproducts'>
            <div className='listproducts'>
            <div className='productrow'>
              {product.map((value,index)=>(
                 <Link  className='navigatelink' to={`/productdetails/${value.id}`}>
                 <div className='singleproductdiv'>
                   <button className='kartbutton'><BsCartCheckFill />
                   </button>
                   <img src={value.image} alt="" className='productimage' />
                   <Link to="/women"><h6 className='hidenid'>{value.id}</h6></Link>
                   <h5>{value.brand}</h5>
                   <h4><span>₹ - </span>{value.price}</h4>
                   <h6>{value.name}</h6>
                 </div>
                  </Link>
              ))}
              
            </div>
    
          </div>
    
            </div>
            
        </div>
      )
}

export default Collection

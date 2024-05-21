import React, { useContext, useEffect, useState } from 'react'
import "./item.css"
import loading_img from "../Assets/loading_image.jpg"
import { StoreContext } from '../../Context/Storecontext'
const Item = ({product,Loading}) => {
  useEffect(()=>{

  })
  const {addtocart}= useContext(StoreContext);
  return (
    <div className='item'>
        <div className={Loading ? "animated":""}><img className = {Loading ? "loading":""} src={Loading ? loading_img:product.image}  alt="" /></div>
        {Loading ?<p className={Loading ? 'animated-text':""}></p>:<p className='productname'>{product.name}</p> }
        <div className="item-prices">
            <div className="item-price-new">
                {Loading ? <p className={Loading ? 'animated-price':""}></p>:<p>${product.price}</p>} 
            </div>

            {Loading ? <span></span>:<button onClick={()=>{localStorage.getItem("auth-token") ? addtocart(product.id,product.category): window.location.replace("/login")}}>Add To Cart</button>}

            
        </div>
    </div>

  )
}

export default Item
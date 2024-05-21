import React, { useContext, useEffect, useState } from 'react'
import API_URL from "../../config.js"
import {useNavigate,redirect,Navigate} from "react-router-dom"
import "./item.css"
import loading_img from "../Assets/loading_image.jpg"
import { StoreContext } from '../../Context/Storecontext'

const Item = ({product,Loading}) => {
     const navigate = useNavigate();
     
    //redirect unlogged user to login page when he select and item
    
    const Redirect = ()=>{
    return navigate("/login");
    
  }

  const {addtocart}= useContext(StoreContext);
  return (
    <div className='item'>
        <div className={Loading ? "animated":""}><img className = {Loading ? "loading":""} src={Loading ? loading_img:product.image.replace("http://localhost:5000",API_URL)}  alt="" /></div>
        {Loading ?<p className={Loading ? 'animated-text':""}></p>:<p className='productname'>{product.name}</p> }
        <div className="item-prices">
            <div className="item-price-new">
                {Loading ? <p className={Loading ? 'animated-price':""}></p>:<p>${product.price}</p>} 
            </div>

            {Loading ? <span></span>:<button onClick={()=>{localStorage.getItem("auth-token") ? addtocart(product.id,product.category): Redirect()}}>Add To Cart</button>}

            
        </div>
    </div>

  )
}

export default Item
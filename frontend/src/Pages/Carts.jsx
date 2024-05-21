import React, { useContext, useEffect, useState } from 'react'
// import data from "../components/Assets/products.js"
import { StoreContext } from '../Context/Storecontext.jsx'
import Cartitem from '../components/Cartitem/Cartitem.jsx'
import "./Css/Carts.css"
import Swal from 'sweetalert2'
import API_URL from "../../src/config"

const Carts = () => {
  let {Username,cart,AvailableProducts,Selectedproduct} = useContext(StoreContext);
  let [totalPrice,setTotalPrice]=useState(0);
  let [Producttodisplay,setProducttodisplay] =useState([]);

  // update the selected products whenever the user add items to cart
  useEffect(()=>{
    let Selectedproduct
    Selectedproduct = AvailableProducts.filter((product)=> {return cart[product.id] > 0});
    setProducttodisplay(Selectedproduct);
    if(Selectedproduct){
        let Totalprice = 0;
        Selectedproduct.map((product)=>{Totalprice+= product.price * cart[product.id]})
        setTotalPrice(Totalprice);
    }
  },[cart])

   
    const Submit_order = async()=>{
    let order_details = Selectedproduct;
    let Amount = totalPrice;
    let username = localStorage.getItem("Foodyoxusername");

    

    if (totalPrice>0){
       try{
           let response = await fetch(`${API_URL}/submitorder`, {
               method: "POST",
               headers: {
                   Accept: "application/json",
                   'auth-token': `${localStorage.getItem("auth-token")}`,
                   "Content-Type": "application/json"
               }
               ,
               body: JSON.stringify({ order_details: order_details, amount: Amount, order_issuer: username, coupon: false })
           })

           let data = await response.json();
           if (data.success) {
            //    alert("the order has successfully been submitted");
               Swal.fire({
                title: "Good job!",
                text: "Your order has been successfully submited!",
                icon: "success"
              }).then((result)=>{
                if (result.isConfirmed) {
                    window.location.replace("/");
                  }
              });

           }
       }
       catch(err){
        console.log("erro when submiting order",err);
       }
       
    }


    else{
        console.log("the logged user is",Username);
    }
  }
  
 
  
  
  
  
  return (
    <div className="cart">
        <div>
            <div className='container'>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {Producttodisplay.length >0 ? Producttodisplay.map((product,index)=>{return <Cartitem key={index} product={product}/>}):""}
                        </tbody>
                    
                    </table>
                </div>
            </div>
        </div>
          <div className='total'>
              <div className='container'>
                  <div className='totaltopay'>
                      <div>
                          <p><span>Total</span> <span>${totalPrice}</span></p>
                          <p><span>Additional Fees</span><span>$0</span></p>
                          <button onClick={()=>Submit_order()}>Submit Order</button>
                      </div>

                  </div>
              </div>

          </div>
    </div>
  )
}

export default Carts
import React, { useContext } from 'react'
// import data from "../Assets/products.js";
import Item from "../Item/Item";
import './OurBurgers.css'
import { StoreContext } from '../../Context/Storecontext.jsx';
const OurBurgers = ({data,Loading}) => {
    const {cart} = useContext(StoreContext)
    let Burgerproduct = data.filter((product)=> product.category==="Burger")
  return (
    <div className='ourburger' id="burger">
        
        <div className='container'>
            <h2>OUR BURGERS</h2>
            <div className='content'>
                {Loading? <>
                  <Item key={1}  Loading={Loading}/>
                  <Item key={2} Loading={Loading}/>
                  <Item key={3}  Loading={Loading}/>
                </>:Burgerproduct.map((product)=>{
                            return <Item key={product.id} product={product} Loading={Loading}/>
                })}
            </div>
        </div>
        
        
    </div>
  )
}

export default OurBurgers
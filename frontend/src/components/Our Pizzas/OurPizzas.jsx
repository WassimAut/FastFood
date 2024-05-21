import React, { useContext } from 'react'
// import data from "../Assets/products.js";
import Item from "../Item/Item";
import './OurPizzas.css'
import { StoreContext } from '../../Context/Storecontext.jsx';

const OurPizzas = ({data,Loading}) => {
  let Pizzaproduct = data.filter((product)=> product.category==="Pizza")
  return (
    <div className='ourpizzas' id="pizza">
        
        <div className='container'>
            <h2>OUR PIZZA</h2>
            <div className='content'>
                {/* {Pizzaproduct.map((product)=>{
                            return <Item key={product.id} product={product}/>
                })} */}

                {Loading? <>
                  <Item key={1}  Loading={Loading}/>
                  <Item key={2} Loading={Loading}/>
                  <Item key={3}  Loading={Loading}/>
                </>:Pizzaproduct.map((product)=>{
                            return <Item key={product.id} product={product} Loading={Loading}/>
                })}


            </div>
        </div>
        
        
    </div>
  )
}

export default OurPizzas
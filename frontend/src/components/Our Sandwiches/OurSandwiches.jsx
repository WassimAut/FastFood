import React, { useContext } from 'react'
// import data from "../Assets/products.js";
import Item from "../Item/Item";
import './OurSandwiches.css'
import { StoreContext } from '../../Context/Storecontext.jsx';
const OurSandwiches = ({data,Loading}) => {
    const {cart} = useContext(StoreContext)
    let Sandwichproduct = data.filter((product)=> product.category ==="Sandwich");
  return (
    <div className='oursandwich' id="sandwich">
        <div className='container'>
            <h2>OUR SANDWICHES</h2>
            <div className='content'>
                {/* {Sandwichproduct.map((product)=>{
                            return <Item key={product.id} product={product}/>
                })} */}

                {Loading? <>
                  <Item key={1}  Loading={Loading}/>
                  <Item key={2} Loading={Loading}/>
                  <Item key={3}  Loading={Loading}/>
                </>:Sandwichproduct.map((product)=>{
                            return <Item key={product.id} product={product} Loading={Loading}/>
                })}

            </div>
        </div>
        
        
    </div>
  )
}

export default OurSandwiches
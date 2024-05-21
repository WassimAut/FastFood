import React, { useContext } from 'react'
import "./Cartitem.css"
import { StoreContext } from '../../Context/Storecontext'

const Cartitem = ({product}) => {
  let {cart,addtocart,deletefromcard,reinitialise} = useContext(StoreContext);
  return (
    <tr>
        <td><img src={product.image} alt="" /></td>
        <td>{product.name}</td>
        <td>${product.price * cart[product.id]}</td>
        <td>
          <div className='quantity'>
            <button className='controle' onClick={()=>deletefromcard(product.id,product.category)}>-</button>
            <span className='quantity'>{cart[product.id]}</span>
            <button className='controle' onClick={()=>addtocart(product.id,product.category)}>+</button>
          </div>
        </td>
        <td>
          <span className='delete' onClick={()=>reinitialise(product.id,product.category)}>delete</span>
        </td>
    </tr>
  )
}

export default Cartitem
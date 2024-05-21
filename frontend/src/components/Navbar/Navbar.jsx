import React, { useContext, useRef } from 'react'
import { Link as Linkscroll } from 'react-scroll';

import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/Storecontext';
const Navbar = () => {
  let {NSelectedItems} = useContext(StoreContext);
  let Listref = useRef();
  const Handel = (e)=>{
  Listref.current.classList.toggle("pop")
  }
  return (
    <div className="navbar">
        <div className="container">
            <div className="content">
                <div className='title'>FoodYox</div>

                <div className='options'>
                
                    <ul ref={Listref}>
                        <Link to="/" style={{ textDecoration: 'none'}}><li>Home</li></Link>
                        <Linkscroll to="pizza" smooth={true} offset={-50}><li>Pizza</li></Linkscroll>
                        <Linkscroll to="burger" smooth={true} offset={-50} ><li>Burgers</li></Linkscroll>
                        <Linkscroll to="sandwich" smooth={true} offset={-50}><li>Sandwiches</li></Linkscroll>
                    </ul>
                    {/* <button>Login</button> */}
                </div>
                
                <div className='loginandcart'>
                    <FontAwesomeIcon className="barcontrole" icon={faBars} onClick={(e)=>{Handel(e)}}/>
                     {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem("auth-token");window.location.replace("/login")}}>Logout</button>:<Link to="login"><button>Login</button></Link>}
                    {/* <Link to="login"><button>Login</button></Link> */}
                    <div className='shoppingcart'>
                        <Link to="cart"><FontAwesomeIcon  icon={faCartShopping}/></Link>
                        {NSelectedItems>0 ? <span>{NSelectedItems}</span>:""}
                    </div>
                    
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar
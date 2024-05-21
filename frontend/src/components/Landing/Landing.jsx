import React from 'react'
import './Landing.css'
import Landingpic from "../Assets/Landing_photo.png"

const Landing = () => {
  return (
    <div className='Landing'>
      
      <div className="container">
        <div className="content">
          <div className="content-left">
            <div className='landing-text'>
              Welcome to FoodYox <br /> Discover Delicious Food, <br/> Hassle Free Ordering
            </div>
          </div>
          <div className="content-right">
            <img src={Landingpic} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
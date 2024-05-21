import React from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter,faFacebookMessenger,faYoutube} from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    <div className="footer">
      <div className='container'>
        <div className='content'>
          <div>
            <Link to="contactus"><span>Contact Us</span></Link>
            <Link to="Aboutus"><span>About Us</span></Link>
          </div>
          <div className='socialmedia'>
          <a href='#'><FontAwesomeIcon icon={faFacebook} /></a>
          <a href='#'><FontAwesomeIcon icon={faTwitter} /></a>
          <a href='#'><FontAwesomeIcon icon={faFacebookMessenger} /></a>
          <a href='#'><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
          <span>
            2024 &copy; FoodYox
          </span>
        </div>


      </div>
    </div>
  )
}

export default Footer
import React, { useEffect, useState } from 'react'
import Mobileimg from "../Assets/Aboutus.jpg";
import "./About.css";
import Aboutus from "../Assets/about_us.jpg"
const About = () => {

    
        const [imageUrl, setImageUrl] = useState('');
      
        const updateImageUrl = () => {
          const width = window.innerWidth;
          console.log(width)
          if (width < 768) {
            setImageUrl(Mobileimg);
            
          } 

           else {
            setImageUrl(Aboutus);
          }
        };


        useEffect(() => {
            // Update the image URL when the component mounts
            updateImageUrl();
        
            // Add event listener for window resize
            window.addEventListener('resize', updateImageUrl);
        
            // Clean up the event listener on component unmount
            return () => {
              window.removeEventListener('resize', updateImageUrl);
            };
          }, []);

    return (
        <div className='about_us'>
            <div className='container'>
                <h2>ABOUT US</h2>
                <div className='content'>
                    <div className='imgcontainer'>
                        <img src={imageUrl} alt="" />
                    </div>
                    <div className='text'>
                        <h2>We make our food with love and passion</h2>
                        <p>Our team of chefs uses only the freshest ingredients to create
                            mouthwatering dishes that you'll love. We have a range of
                            options to suit all tastes, from classic pepperoni pizzas to
                            gourmet cheeseburgers. Whether you're dining in or ordering
                            delivery, we guarantee you'll be impressed by the quality and
                            flavor of our food.</p>
                        <button><a href='#'>Learn More</a></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About
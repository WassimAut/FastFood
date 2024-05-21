import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faUtensils, faPeopleGroup, faStar, faPizzaSlice, faBurger } from '@fortawesome/free-solid-svg-icons';
import "./Css/About.css";
const About = () => {
    return (
        <div className='about'>
            <div className='container'>
                <div className='content'>
                    <div className='image'>
                        <div className='text'>
                            <h2>Welcome to FoodYox</h2>
                            <p>We're a family-owned restaurant that's been serving up delicious food and great memories for over 20 years.
                                Whether you're in the mood for a classic cheeseburger or a gourmet pizza, we've got you covered. Come on in and
                                see what makes us so special</p>
                        </div>
                    </div>

                    <div className='ourstory'>
                        <h3>Our story</h3>
                        <p>Our story begins in 1999, when our family opened a small pizzeria in the heart of New York City. We quickly became
                            known for our delicious, hand-tossed pizzas, made with the freshest ingredients and baked to perfection. Over the
                            years, our menu has expanded to include a wide variety of burgers, sandwiches, and salads, but our commitment to
                            quality and customer service has never wavered. Today, we're proud to be one of the most popular restaurants in the
                            city, serving up our signature blend of classic comfort food and innovative culinary creations.</p>
                    </div>

                    <div className='ourvalues'>
                        <h3>Our values</h3>
                        <div className='content'>
                            <div className='box'>
                                <FontAwesomeIcon icon={faLeaf} />
                                <h3>Quality Ingredients</h3>
                                <p>We use only the finest
                                    meats, cheeses, and
                                    produce in our kitchen</p>
                            </div>

                            <div className='box'>
                                <FontAwesomeIcon icon={faUtensils} />
                                <h3>Fresh & Delicious</h3>
                                <p>Our food is always made to
                                    order, never frozen, and
                                    never processed</p>
                            </div>

                            <div className='box'>
                                <FontAwesomeIcon icon={faPeopleGroup} />
                                <h3>Family Friendly</h3>
                                <p>Our dining room is warm
                                    and welcoming, with plenty
                                    of seating for families and
                                    groups</p>
                            </div>

                            <div className='box'>
                                <FontAwesomeIcon icon={faStar} />
                                <h3>Excellent Service</h3>
                                <p>Our staff is friendly,
                                    knowledgeable, and
                                    always ready to help</p>
                            </div>


                        </div>
                    </div>

                    <div className='Whatsunique'>
                        <h3>What sets us apart</h3>
                        <div className='content'>

                            <div className='box'>
                                <FontAwesomeIcon icon={faPizzaSlice} />
                                <h3>Gourmet Pizzas</h3>
                                <p>Our pizzas are
                                    handcrafted with
                                    unique flavor
                                    combinations and
                                    premium toppings</p>
                            </div>

                            <div className='box'>
                                <FontAwesomeIcon icon={faBurger} />
                                <h3>Creative Burgers</h3>
                                <p>From juicy beef
                                    patties to plant-
                                    based options, our
                                    burgers are anything
                                    but ordinary</p>
                            </div>

                            <div className='box'>
                                <FontAwesomeIcon icon={faPeopleGroup} />
                                <h3>Artisanal
                                    Sandwiches</h3>
                                <p>Made with crisp,
                                    farm-fresh greens
                                    and house-made
                                    dressings, our
                                    salads are both
                                    wholesome and
                                    delicious</p>
                            </div>

                            <div className='box'>
                                <FontAwesomeIcon icon={faStar} />
                                <h3>Decadent
                                    Desserts</h3>
                                <p>Indulge your sweet
                                    tooth with our
                                    selection of rich,
                                    velvety desserts, all
                                    made from scratch
                                    in our kitchen</p>
                            </div>
                        </div>

                    </div>

                    <div className='ourcommitment'>
                        <h3>Our commitment</h3>
                        <p>Our goal is to provide our guests with an exceptional dining experience, from the moment they walk in the door to the
                            last bite of their meal. We're passionate about creating food that's not only delicious but also made with integrity and
                            care. We're committed to supporting our local community by sourcing from nearby farms and suppliers. And most
                            importantly, we're dedicated to treating our customers like family, with warmth, respect, and genuine hospitality.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
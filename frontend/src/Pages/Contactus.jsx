import React, { useState } from 'react'
import "./Css/Contactus.css";
import Swal from 'sweetalert2';
import maps from "../components/Assets/map.PNG"
const Contactus = () => {

    let [Formdata, setFormdata] = useState({
        name: "",
        email: "",
        message: ""
    })


    const sendmessage = async () => {
        if (!Formdata.name || !Formdata.email || !Formdata.message) {
            Swal.fire({
                title: "Warning!",
                text: "Please check your information",
                icon: "warning"
            })
            return
        }
        try {
            let response = await fetch("http://localhost:5000/sendmessage", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: Formdata.name, email: Formdata.email, message: Formdata.message })
            })
            let data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: "The message is sent!",
                    text: "We'll respond at the nearest convenience!",
                    icon: "success"
                })
            }
            else {
                Swal.fire({
                    title: "Erro!",
                    text: "Erro while sending the message",
                    icon: "error"
                })
            }
        }
        catch (err) {
          console.log("Error while sending the message",err);

          Swal.fire({
            title: "Erro!",
            text: "Erro while sending the message",
            icon: "error"
        })

        }

    }



    const Handelchange = (e) => {
        setFormdata((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }

    return (
        <div className='contactus'>
            <div className='container'>
                <div className='content'>
                    <div className='form'>

                        <h2>Contact Us</h2>
                        <label for="name">Name:</label>
                        <input onChange={Handelchange} type="text" id="name" name="name" required></input>

                        <label for="email">Email:</label>
                        <input onChange={Handelchange} type="email" id="email" name="email" required></input>

                        <label for="message">Message:</label>
                        <textarea onChange={Handelchange} id="message" name="message" rows="5" required></textarea>

                        <button onClick={() => sendmessage()} type="submit">Submit</button>
                    </div>

                    <div className='ourlocation'>
                        <h3>Our Location</h3>
                        <span>1234 S. Main St. SanFrancisco, NY 94103</span>

                        <div className='imgcontainer'>
                            <img src={maps} alt="" />
                        </div>

                        <h3>Hours of Operation</h3>
                        <span>Monday - Friday: 11:30am - 9:00pm</span>
                        <span>Saturday-Sunday: 12:00pm - 8:00pm</span>

                        <h3>Contact</h3>
                        <span>(415) 123-4567</span>
                        <span>info@FoodYox.com</span>

                        <h3>Follow Us</h3>
                        <span>Instagram, Twitter, Facebook</span>
                        <span>@FoodYox</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contactus
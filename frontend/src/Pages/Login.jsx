import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import './Css/Login.css'
import { useState } from 'react';
import { StoreContext } from '../Context/Storecontext';
import API_URL from "../../src/config";
const Login = () => {
   let [status,setStatus]= useState("Login");
   let {Username,setUsername}= useContext(StoreContext);
   let [Formdata,setFormdata]=useState({
    username:"",
    email:"",
    password:""
   })

   const Login = async()=>{
    
    let response = await fetch(`${API_URL}/login`,{
    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({username:Formdata.username,email:Formdata.email,password:Formdata.password})
   })

   let data = await response.json();
   if (data.success){

      localStorage.setItem("auth-token",data.token);
      
      
      setUsername("zzzzzz");
      localStorage.setItem("Foodyoxusername",data.username)
      window.location.replace("/");
   }
   else{
    
    Swal.fire({
        title: "Invalid user data!",
        text: "Please verify your information!",
        icon: "error"
   })
   
   }
}

   const Signup = async()=>{
   
   let response = await fetch(`${API_URL}/signup`,{
    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({username:Formdata.username,email:Formdata.email,password:Formdata.password})
   })
   let data = await response.json();

   if (data.success){
      localStorage.setItem("auth-token",data.token);
      localStorage.setItem("Foodyoxusername",data.username)
      window.location.replace("/");
   }
   else{
    // alert(data.error)
    Swal.fire({
        title: "Already existing user!",
        text: "Please enter a different email address!",
        icon: "error"
   })
   }
   
   }

   const Handelchange = (e)=>{
    setFormdata((prev)=>{return {...prev,[e.target.name]:e.target.value}})
   }


  return (
    <div className="login">
        <div className='container'>
            <div className='content'>
                <div className='form'>
                <h2>{status} to FoodYox</h2>
                <div className='signfields'>
                    {status==="Signup" ?<input onChange={Handelchange} name="username" type="text" placeholder="Enter Your Username"/>:""}
                    <input onChange={Handelchange} type="email"  name="email" placeholder="Enter Your Email"/>
                    <input onChange={Handelchange} type="password" name="password" placeholder="Password"/>
                </div>
                <div className='submit'><button onClick={()=>{status==="Login"? Login():Signup()}}>Continue</button></div>
                {status === "Signup"? <div className='signfield-controle'>Already have an account? <span onClick={()=>setStatus("Login")}>Click Here</span></div>:
                <div className='signfield-controle'>Don't You Have an Account? <span onClick={()=>setStatus("Signup")}>Click Here</span></div>
                }
               </div>
            </div>
        </div>
    </div>
  )
}

export default Login
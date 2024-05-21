import React, { useEffect, useState } from 'react'
import Landing from '../components/Landing/Landing'
import OurBurgers from '../components/Our Burgers/OurBurgers'
import OurPizzas from '../components/Our Pizzas/OurPizzas'
import OurSandwiches from '../components/Our Sandwiches/OurSandwiches'
import About from '../components/About us/About'
import API_URL from "../../src/config"
const Home = () => {
  
  let [data,setData]=useState([])
  let [Loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchData = async()=>{
      let response = await fetch(`${API_URL}/availableproduct`,{
      headers:{
        Accept:"application/json"
      }
    })
      let Data= await response.json();
      setData(Data.data);
      setLoading(false);
    }   
    fetchData()
  },[])
  
  return (
    <div>
        <Landing />
        <OurBurgers data={data} Loading={Loading}/>
        <OurPizzas data={data} Loading={Loading}/>
        <OurSandwiches data={data} Loading={Loading}/>
        <About/>
    </div>
  )
}

export default Home
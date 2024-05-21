
import './App.css';
// import Landing from './components/Landing/Landing.jsx';
// import Navbar from './components/Navbar/Navbar.jsx';
// import OurBurgers from './components/Our Burgers/OurBurgers.jsx';
// import OurPizzas from './components/Our Pizzas/OurPizzas.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SharedLayout from './components/SharedLayout/SharedLayout.jsx';
import Home from './Pages/Home.jsx';
import Carts from './Pages/Carts.jsx';
import Login from './Pages/Login.jsx';
import About from './Pages/About.jsx';
import Contactus from './Pages/Contactus.jsx';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<SharedLayout/>}>
        <Route index element ={<Home/>}/>
        <Route path="cart" element ={<Carts/>}/>
        <Route path="login" element = {<Login/>}/>
        <Route path="Aboutus" element = {<About/>}/>
        <Route path="contactus" element = {<Contactus/>}></Route>
      </Route>
     </Routes>
    </BrowserRouter>
    
    
    
    
  );
}

export default App;

import React, { createContext, useContext, useEffect, useState } from 'react'
export const StoreContext = createContext(null);
export const HomepageContext = createContext(null);
const getdefaultcart = ()=>{
    let cart = {}
    for (let i=0;i<100;i++){
        cart[i]=0
    }
    return cart
}


const StorecontextProvider = ({children}) => {
    const [cart,setCart]=useState(getdefaultcart());
    const [NSelectedItems,setNSelectedItems] = useState(0);
    let [AvailableProducts,setAvailableProducts] = useState([]);
    let [Username,setUsername]= useState("ahmed");

    let [Selectedproduct,setSelectedProduct]=useState({
        "Pizza":0,"Burger":0,"Sandwich":0
    });
    console.log(Username);
    const addtocart=(id,category)=>{
    console.log("i got clicked")
    setCart(prev=> {return {...prev,[id]:prev[id]+1}});
    setSelectedProduct((prev)=>{return {...prev,[category]:prev[category]+1}})
    setNSelectedItems(prev=>prev+1);
}

    const deletefromcard=(id,category)=>{
        setCart(prev=> {return {...prev,[id]:prev[id]-1}});
        setSelectedProduct((prev)=>{return {...prev,[category]:prev[category]-1}})
        setNSelectedItems(prev=>prev-1);
    }

    const reinitialise = (id,category)=>{
        setNSelectedItems(prev=> prev-cart[id]);
        setSelectedProduct((prev)=>{return {...prev,[category]:prev[category]-cart[id]}})
        setCart((prev)=>{return {...prev,[id]:0}})
    }

    const Preselecteditems = (Cartdata)=>{
        let totalitems=0;
        for (let i=0;i< Object.keys(Cartdata).length;i++){
           totalitems+=Cartdata[i];
        }
        setNSelectedItems(totalitems);
       
       }

    useEffect(()=>{
       Preselecteditems(cart)
    },[])

    useEffect(()=>{
        const fetchAvailableproduct = async()=>{
           try{
               let response = await fetch("http://localhost:5000/availableproduct");
               let Data = await response.json();
               if (Data.success) {
                   // setData(Data.data);
                   let AllProducts = Data.data;
                   setAvailableProducts(AllProducts);
               } 
           }
           catch(err){
               console.log(err)
           }
        
        }
        fetchAvailableproduct();
     },[])

    const Contextvalues= {cart,addtocart,deletefromcard,setCart,reinitialise,NSelectedItems,AvailableProducts,Username,setUsername,Selectedproduct}
  return (
    <StoreContext.Provider value={Contextvalues}>
     {children}
    </StoreContext.Provider>
  )
}

export default StorecontextProvider


// const HomepageContextProvider = ({children})=>{
//     let [data,setData]=useState([])
//     let [Loading,setLoading] =useState(true)
//     useEffect(()=>{
//         const fetchData = async()=>{
//           let response = await fetch("http://localhost:5000/availableproduct",{
//           headers:{
//             Accept:"application/json"
//           }
//         })
//           let Data= await response.json()
//           console.log("this is your data",Data)
//           setData(Data.data)
//           setLoading(false)
    
//         }   
//         fetchData()
//       },[])
//       let HomePageContext = {data,Loading}
//       return (
//       <HomepageContext.Provider value={HomePageContext}>
//         {children}
//       </HomepageContext.Provider>
//       )
        
      
      
// }
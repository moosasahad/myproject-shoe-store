import React, { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/sections/Home/Home';
import Navbare from './components/Navbar/Navbar';
import Registration from './components/registrationandlogin/Registration';
import Login from './components/registrationandlogin/Login';
import Men from './components/sections/Men/Men';
import Collection from './components/sections/collectio/Collection';
import Women from './components/sections/women/Women';
import Footer from './components/sections/Home/Footer';
import Productdetails from './components/sections/productdetails/Productdetails';
import Cartui from './components/cart/Cartui';
import Paymen from './components/payment/Paymen';

import Dashborder from './components/admin/dashbord/Dashborder';
import Productinsdmin from './components/admin/product/Productinsdmin';
import Userinadmin from './components/admin/adminuser/Userinadmin';
import Ordersinadmin from './components/admin/adminorders/Ordersinadmin';
import Sidebar from './components/admin/sdibar/Sidebar';
import Profiladmin from './components/admin/profileadmin/Profiladmin';
import Admindetails from './components/admin/details/Admindetails';
import Edite from './components/admin/edititem/Edite';
import Adproduct from './components/admin/addproduct/Adproduct';
import Userdetaulsview from './components/admin/adminuser/Userdetaulsview';
import { ToastContainer } from 'react-toastify';
import Wishlist from './components/whislist/Wishlist';
// import Success from './components/payment/success';
import Orders from './components/payment/Orders';
import Cookies from 'js-cookie';
import useProducts from './components/coustom hook/Products';
import Adress from './components/payment/Adress';
export const Valuecontext = createContext();

function App() {
  const [value, setValue] = useState("mooas");
  const [update, setUpdate] = useState([]);
  const [cartup, setCartup] = useState([]);
  const [adminstate, setAdminstate] = useState(false);
  const[displaylgo,setDisplaylog]=useState("")
  const [cartin, setCartin]=useState([])
  const [login,SetLOgin]=useState([])
  const [logout,setLOgout]=useState([])
  const [userInitial, setUserInitial] = useState("");
  


  const obj = {
    value,
    setValue,
    update,
    setUpdate,
    cartup,
    setCartup,
    setAdminstate,
    adminstate,
    setDisplaylog,
    displaylgo,
    cartin,
     setCartin,
     SetLOgin,
     login,
     logout,
     setLOgout,
     setUserInitial,
     userInitial,     
  };
useEffect(()=>{
const items=Cookies.get('adminuser')
// console.log("adminuser",items);
items&& setAdminstate(items)
},[])
// console.log("adminstate",adminstate);
const [isloading] = useProducts()
  return (
<Valuecontext.Provider value={obj}>
    <div>
      {!isloading?(
         <div className="flex justify-center items-center h-screen">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
       </div>
      ):(
        <div>
      {!adminstate ? (
        
            <div className="App">
              <Navbare/>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/productdetails/:_id" element={<Productdetails />} />
                <Route path="/cartui" element={<Cartui />} />
                <Route path="/Wishlist" element={<Wishlist/>}/>
                <Route path="/paymentpage" element={<Paymen />} />
                {/* <Route path="/success/:sctionId" element={<Success />} /> */}
                <Route path="/orderse" element={<Orders />} />
                <Route path="/orders/:sctionId" element={<Orders />} />
                <Route path="/addres" element={<Adress />} />


                

              </Routes>
              <Footer />
             
              </div>
          
            
          
        
      ) : (
        <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
  
        {/* Main content area */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashborder />} />
            <Route path="/products" element={<Productinsdmin />} />
            <Route path="/users" element={<Userinadmin />} />
            <Route path="/orders" element={<Ordersinadmin />} />
            <Route path="/profile" element={<Profiladmin />} />
            <Route path="/details/:id" element={<Admindetails />} />
            <Route path="/editing/:id" element={<Edite />} />
            <Route path="/addingproduct" element={<Adproduct />} />
            <Route path="userorderview/:id" element={<Userdetaulsview />} />
          </Routes>
        </div>
      </div>
      )}
<ToastContainer
  position="top-center"
  autoClose={1500}
  hideProgressBar={true}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
  </div>
      )}
    </div>
  </Valuecontext.Provider>
   
  );
}

export default App;

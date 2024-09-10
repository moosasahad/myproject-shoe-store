import React, { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/sections/Home/Home';
import Navbare from './components/Navbar/Navbar';
import Registration from './components/registrationandlogin/Registration';
import Cart from './components/cart/Cart';
import Login from './components/registrationandlogin/Login';
import Men from './components/sections/Men/Men';
import Collection from './components/sections/collectio/Collection';
import Women from './components/sections/women/Women';
import Footer from './components/sections/Home/Footer';
import Productdetails from './components/sections/productdetails/Productdetails';
import Cartui from './components/cart/Cartui';
import Paymen from './components/payment/Paymen';
import Adminhome from './components/admin/admin main/Adminhome';

export const Valuecontext = createContext();

function App() {
  const [value, setValue] = useState("mooas");
  const [update, setUpdate] = useState([]);
  const [cartup, setCartup] = useState([]);
  const [adminstate, setAdminstate] = useState(false);


  const obj = {
    value,
    setValue,
    update,
    setUpdate,
    cartup,
    setCartup,
    setAdminstate,
  };


console.log("jfdghgjkdfhgkjfdhgjkfdhg app admin on app", adminstate);
useEffect(()=>{
const items=localStorage.getItem('admin')
items&& setAdminstate(JSON.parse(items))
},[])
  return (
<Valuecontext.Provider value={obj}>
    <div>
      {!adminstate ? (
        
            <div className="App">
           
            
            
              <Navbare />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/productdetails/:id" element={<Productdetails />} />
                <Route path="/cartui" element={<Cartui />} />
                <Route path="/paymentpage" element={<Paymen />} />
              </Routes>
              <Footer />
             
              </div>
          
            
          
        
      ) : (
          <div>
            
            <Routes>
          
            <Route path="/" element={<Adminhome />} />
            
          </Routes>         
          </div>
      )}
  </div>
  </Valuecontext.Provider>
   
  );
}

export default App;

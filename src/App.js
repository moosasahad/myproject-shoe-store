
import React, { useState, createContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/sections/Home/Home';
import Navbare from './components/Navbar/Navbar';
import Registration from './components/registrationandlogin/Registration';
import Cart from './components/cart/Cart';
import Login from './components/registrationandlogin/Login';
import Men from './components/sections/Men/Men';
import Collection from './components/sections/collectio/Collection';
import Lookbook from './components/sections/lookbook/Lookbook';
import Sale from './components/sections/sale/Sale';
import Women from './components/sections/women/Women';
import Footer from './components/sections/Home/Footer';
import Productdetails from './components/sections/productdetails/Productdetails';
import Cartui from './components/cart/Cartui';
import Paymen from './components/payment/Paymen';

export const Valuecontext = createContext()
function App() {

  const[value, setValue]=useState("mooas")
  const[update,setUpdate]=useState([])
  const obj={
    value,setValue,update,setUpdate
  }
  
  return (
   
    <BrowserRouter>
<Valuecontext.Provider value={obj}>
    <div className="App">
      <Navbare/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/lookbook' element={<Lookbook/>}/>
        <Route path='/sale' element={<Sale/>}/>
        <Route path='/productdetails/:id' element={<Productdetails/>}/>
        <Route path='/cartui' element={<Cartui/>}/>
        <Route path='paymentpage' element={<Paymen/>}/>
        

      </Routes>
      <Footer/>
      </Valuecontext.Provider>

    </BrowserRouter>
    
  );
}

export default App;

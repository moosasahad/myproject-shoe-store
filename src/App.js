import React, { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row} from 'react-bootstrap';
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

import Dashborder from './components/admin/dashbord/Dashborder';
import Productinsdmin from './components/admin/product/Productinsdmin';
import Userinadmin from './components/admin/adminuser/Userinadmin';
import Ordersinadmin from './components/admin/adminorders/Ordersinadmin';
import Sidebar from './components/admin/sdibar/Sidebar';
import Navbaradmin from './components/admin/admin main/Navbaradmin';
import Profiladmin from './components/admin/profileadmin/Profiladmin';
import Admindetails from './components/admin/details/Admindetails';
import Edite from './components/admin/edititem/Edite';
import Adproduct from './components/admin/addproduct/Adproduct';
import Userdetaulsview from './components/admin/adminuser/Userdetaulsview';
import { ToastContainer } from 'react-toastify';
import Wishlist from './components/whislist/Wishlist';
import Success from './components/payment/success';
import Orders from './components/payment/Orders';
import Cookies from 'js-cookie'

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
     userInitial
     
  };
useEffect(()=>{
const items=Cookies.get('adminuser')
// console.log("adminuser",items);
items&& setAdminstate(items)
},[])
console.log("adminstate",adminstate);

  return (
<Valuecontext.Provider value={obj}>
    <div>
      {!adminstate ? (
        
            <div className="App">
              <Navbare/>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/productdetails/:_id" element={<Productdetails />} />
                <Route path="/cartui" element={<Cartui />} />
                <Route path="/Wishlist" element={<Wishlist/>}/>
                <Route path="/paymentpage" element={<Paymen />} />
                <Route path="/success/:sctionId" element={<Success />} />
                <Route path="/orders/:sctionId" element={<Orders />} />
                <Route path="/orders" element={<Orders />} />

              </Routes>
              <Footer />
             
              </div>
          
            
          
        
      ) : (
          <div className='admindiv'>
        <Row>
            <Col className='admincoltwo' xs={12} md={1} style={{height: '100vh',msOverflowY: 'auto'}}>
            <Sidebar/>
            </Col>
            <Col  className='maindiveinadminhome'>
            <Routes>
            <Route path="/" element={<Dashborder/>}/>
            <Route path="/products" element={<Productinsdmin/>}/> 
            <Route path='/users' element={<Userinadmin/>}/>
            <Route path='/orders' element={<Ordersinadmin/>}/>
            <Route path='/profile' element={<Profiladmin/>}/>  
            <Route path='/details/:id' element={<Admindetails/>}/>          
            <Route path='/editing/:id' element={<Edite/>}/>
            <Route path='addingproduct' element={<Adproduct/>}/>
            <Route path="Userdetaulsview/:id" element={<Userdetaulsview/>}/>
          </Routes>
            </Col>
        </Row>
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
  </Valuecontext.Provider>
   
  );
}

export default App;

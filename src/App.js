
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


function App() {
  return (
    <BrowserRouter>
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
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;

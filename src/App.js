
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Navbare from './components/Navbar/Navbar';
import Registration from './components/registrationandlogin/Registration';
import Cart from './components/cart/Cart';
import Login from './components/registrationandlogin/Login';


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

      </Routes>
    </BrowserRouter>
  );
}

export default App;

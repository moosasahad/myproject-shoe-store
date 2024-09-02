
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Navbare from './components/Navbar/Navbar';
import LogandReg from './components/registrationandlogin/LogandReg';
import Registration from './components/registrationandlogin/Registration';
import Cart from './components/cart/Cart';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbare/>
      
      </div>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path="/loginpage" element={<LogandReg/>} />
        <Route path="/registration" element={<Registration/>}/>
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

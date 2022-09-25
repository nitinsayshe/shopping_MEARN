import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
// import Home from "./pages/Home";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register";
import Register from "./components/Register/Register";
import Login from './components/Login/Login';
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import ProductDetails from './components/ProductDetails/ProductDetails';

import Address from './components/Address/Address';
// import Payment from './components/Payment/Payment';
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js'

import AddProducts from './components/AddProducts/AddProducts';
import Cart from './components/Cart/Cart';
// const promise =loadStripe('pk_test_51LVwhUSErFzJDeFdvggSUkMmxIPl0bTXq5fIi6UzHB2UdnaJybs6k9QoibHb5CVChwBcVcJ51B3NP4kn2kzLSfQr00SQNMyVr9');



 
 function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (

    <Router>
    <div className='App'>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<><Header/><Home /></>} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/addproducts" element={<AddProducts/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
      
        <Route path="/address" element={<><Address/></>}/>
        <Route path='/productdetails' element={<ProductDetails/>}/>
        <Route path='/cart' element={<><Header/><Cart/></>}/>
      </Routes>
    </div>
  </Router>

    // <Router>
    //   <main className="App">
    //     <Routes>
    //       <Route path="/register" element={<Register/>}/>
    //       <Route path='/login' element={<Login/>}/>
    //       <Route path='/' element={<><Home/></>}/>
    //       <Route path="/payment" element={<Elements stripe={promise}><Payment/></Elements>}/>
    //       <Route path='/productdetails' element={<ProductDetails/>}/>
    //       <Route path='/checkout' element={<Checkout/>}/>
    //       <Route path="/address" element={<><Address /></>}/>
    //       <Route path="/addproducts" element={<AddProducts/>}/>
    //     </Routes>

    //   </main>
    // </Router>
   

  );
}

export default App;

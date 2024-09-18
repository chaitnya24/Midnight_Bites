import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Login from './pages/LoginPopup/LoginPopup.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import Verify from './pages/Verify/Verify.jsx'
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin.jsx'
import AdminSignup from './pages/Admin/AdminSignup/AdminSignup.jsx'
import Add from '../../frontend/src/pages/Admin/Add/Add.jsx';
import List from '../../frontend/src/pages/Admin/List/List.jsx';
import Order from '../../frontend/src/pages/Admin/Order/Order.jsx';
import DeliverySignup from './pages/DeliveryBoy/DeliverySignUp/DeliverySignup.jsx';
import DeliveryLogin from './pages/DeliveryBoy/DeliveryLogin/DeliveryLogin.jsx'
import DeliveryPage from './pages/DeliveryBoy/DeliveryPage/DeliveryPage.jsx';
import DeliveryList from './pages/DeliveryBoy/DeliveryList/DeliveryList.jsx'

const App = () => {

  const url = "http://localhost:4000";


  return (
      <div className='app'>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-signup' element={<AdminSignup />} />
          <Route path="/admin/add" element={ <Add url={url} /> } />
          <Route path="/admin/list" element={ <List url={url} /> } />
          <Route path="/admin/order" element={ <Order url={url} /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/delivery-signup' element={<DeliverySignup />} />
          <Route path='/delivery-login' element={<DeliveryLogin />} />
          <Route path='/delivery' element={<DeliveryPage url={url} />} />
          <Route path='/delivery-list' element={<DeliveryList url={url} />} />
        </Routes>
      </div>
  )
}

export default App

import React, { useContext } from "react";
import "./DeliveryNavbar.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const DeliveryNavbar = () => {
  
    const { setToken } = useContext(StoreContext)

    const naviagte = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        setToken("");
        naviagte("/");
      }

  return (
    <div>
      <div className="delivery-navbar">
      <div onClick={Logout} className='delivery-nav-logo-line'>
        <img className='delivery-logo-img' src="./logo.png" alt="" /> <h2>Midnight Deliveries</h2>
      </div>
      <div className="delivery-navbar-right">
        <div className="delivery-button-div">
            {/* <button className="delivery-list" onClick={() => naviagte('/delivery-list')}>List</button> */}
            {/* <button className="delivery-list" onClick={() => naviagte('/delivery')}>Orders</button> */}
            <button className="delivery-logout" onClick={Logout} >Logout</button>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default DeliveryNavbar

import React, { useContext } from "react";
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
// import { front_assets } from '../../assets/frontend_assets/front_assets'
import { StoreContext } from "../../context/StoreContext";

const Header = () => {

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  const naviagte = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    naviagte("/");
  }

  return (
    <>
    <div className="header-navbar">
      <Link to='/'>
      <div className='header-logo-line'>
        <img className='header-logo-img' src="./logo.png" alt="" /> <h2>Midnight bites</h2>
      </div>
      </Link>
      <div className="header-navbar-right">
        <div className="header-navbar-search-icon">
          {getTotalCartAmount()===0
          ? <></>
          : <Link to='/cart'><img src="./basket_icon.png" className="header-cart-img"></img></Link>}
        </div>
        {!token?<div className="header-button-div">
          <button className="header-login" onClick={() => naviagte('/delivery-login')}>Delivery</button>
          <button className="header-login" onClick={() => naviagte('/admin-login')}>Shop</button>
          <button className="header-login" onClick={() => naviagte('/login')}>Login</button>
          <button className="header-signup" onClick={() => naviagte('/signup')}>Sign up</button>
        </div>
        :<div className="header-navbar-profile">
          <img className="header-profile-icon" src="./profile_icon.png"/>
          <ul className="header-nav-profile-dropdown">
            <li onClick={() => naviagte('/myorders')} ><img src="./bag_icon.png" alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={Logout} ><img src="./logout_icon.png" alt="" /><p>Logout</p></li>
          </ul>
        </div>}
        
      </div>
    </div>
    <div className='header' >
        <div className='header-contents'>
            <h2>Welcome to <br /> Midnight Bites</h2>
            <p>The ultimate food delivery service for hostel students. Whether you're up 
              late studying or just too tired to cook, Midnight Bites connects you with 
              nearby shops and restaurants. With a few clicks, get your favorite dishes 
              delivered right to your door, ensuring you never go hungry when it matters most.</p>
        </div>
      
    </div>
    </>
  )
}

export default Header

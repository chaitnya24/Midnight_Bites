import React, { useContext } from "react";
import "./NavBar.css";
// import { front_assets } from "../../assets/frontend_assets/front_assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";



const NavBar = () => {


  const { token, setToken} = useContext(StoreContext);

  const naviagte = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    naviagte("/");
  }

  return (
    <div className="navbar">
      <Link to='/'>
      <div className='nav-logo-line'>
        <img className='logo-img' src="./logo.png" alt="" /> <h2>Midnight bites</h2>
      </div>
      </Link>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to='/cart'><img src="./basket_icon.png" className="cart-img" /></Link>
        </div>
        {!token?<div className="button-div">
          <button className="login" onClick={() => naviagte('/login')}>Login</button>
          <button className="signup" onClick={() => naviagte('/signup')}>SignUp</button>
        </div>
        :<div className="navbar-profile">
          <img className="navbar-profile-img" src="./profile_icon.png"/>
          <ul className="nav-profile-dropdown">
            <li onClick={() => naviagte('/myorders')} ><img src="./bag_icon.png" alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={Logout} ><img src="./logout_icon.png" alt="" /><p>Logout</p></li>
          </ul>
        </div>}
        
      </div>
    </div>
  );
};

export default NavBar;

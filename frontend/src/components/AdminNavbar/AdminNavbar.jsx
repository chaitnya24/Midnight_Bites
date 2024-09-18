import React, { useContext } from "react";
import "./AdminNavbar.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const AdminNavbar = () => {

    const { setToken } = useContext(StoreContext)

    const naviagte = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        setToken("");
        naviagte("/");
      }

  return (
    <div>
      <div className="admin-navbar">
      <div onClick={Logout} className='admin-nav-logo-line'>
        <img className='admin-logo-img' src="../../logo.png" alt="" /> <h2>Midnight Admins</h2>
      </div>
      <div className="admin-navbar-right">
        <div className="admin-button-div">
            <button className="admin-login" onClick={() => naviagte('/admin/add')}>Add</button>
            <button className="admin-login" onClick={() => naviagte('/admin/list')}>List</button>
            <button className="admin-login" onClick={() => naviagte('/admin/order')}>Orders</button>
            <button className="admin-logout" onClick={Logout} >Logout</button>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default AdminNavbar

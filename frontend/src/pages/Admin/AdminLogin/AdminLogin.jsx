import React, { useContext, useState } from 'react'
import './AdminLogin.css'
import { StoreContext } from '../../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"


const AdminLogin = () => {

    const {url, setToken, setShopName } = useContext(StoreContext)

    const fetchShopName = async (token) => {
        const response = await axios.post(`${url}/api/admin/get`,{},{headers:{token}});
        setShopName(response.data.shop);
    }

    const [data, setData] = useState({
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}));
    }

    const navigate = useNavigate();

    const onLogin = async (event) => {
        event.preventDefault()
        let newURL = url;
        newURL += "/api/admin/login";

        const response = await axios.post(newURL, data) ;

        if (response.data.success) {
            setToken(response.data.token);
            await fetchShopName(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/admin/add");
        }
        else{
            alert(response.data.message);
        }

    }


  return (
    <div className='admin-popup'>
        <div className="admin-container">
        <Link to='/'>
            <div className='admin-logo-line'>
                <img className='admin-logo-img' src="./logo.png" alt="" /> <h2>Midnight bites</h2>
            </div>
        </Link>
        <form onSubmit={onLogin} action="" className="admin-popup-container">
        
            <div className="admin-popup-title">
                <h2>Admin Login</h2>
            </div>
            <div className="admin-popup-inputs">
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit' >Login</button>
            
            
        </form>
        </div>
    </div>
  )
}

export default AdminLogin

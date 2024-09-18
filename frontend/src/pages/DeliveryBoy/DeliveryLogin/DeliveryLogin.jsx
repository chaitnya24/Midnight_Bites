import React, { useContext, useState } from 'react'
import './DeliveryLogin.css'
import { StoreContext } from '../../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
// import { front_assets } from '../../../assets/frontend_assets/front_assets';

const DeliveryLogin = () => {
  const {url, setToken } = useContext(StoreContext)

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
        newURL += "/api/delivery/login";

        const response = await axios.post(newURL, data) ;

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/delivery");
        }
        else{
            alert(response.data.message);
        }

    }

  return (
    <div className='del-login-popup'>
        <div className="del-login-container">
        <Link to='/'>
            <div className='del-login-logo-line'>
                <img className='del-login-logo-img' src="../../logo.png" alt="" /> <h2>Midnight bites</h2>
            </div>
        </Link>
        <form onSubmit={onLogin} action="" className="del-login-popup-container">
        
            <div className="del-login-popup-title">
                <h2>Login</h2>
            </div>
            <div className="del-login-popup-inputs">
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit' >Login</button> 
        </form>
        </div>
    </div>
  )
}

export default DeliveryLogin

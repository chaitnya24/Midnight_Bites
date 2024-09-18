import React, { useContext, useState } from 'react'
import './DeliverySignup.css'
import { StoreContext } from '../../../context/StoreContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
// import { front_assets } from '../../../assets/frontend_assets/front_assets';

const DeliverySignup = () => {
    const {url} = useContext(StoreContext)

    const [data, setData] = useState({
        name:"",
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
        newURL += "/api/delivery/register";

        const response = await axios.post(newURL, data) ;

        if (response.data.success) {
            navigate("/delivery-login")
        }
        else{
            alert(response.data.message);
        }

    }

  return (
    <div className='del-signup-popup'>
        <div className="del-signup-container">
        <Link to='/'>
            <div className='del-signup-logo-line'>
                <img className='del-signup-logo-img' src="../../logo.png" alt="" /> <h2>Midnight bites</h2>
            </div>
        </Link>
        <form onSubmit={onLogin} action="" className="del-signup-popup-container">
            <div className="del-signup-popup-title">
                <h2>Sign Up</h2>
            </div>
            <div className="del-signup-popup-inputs">
                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit' >Create Account</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By coutinuing, i agree to the terms of use & privacy policy</p>
            </div>    
        </form>
        </div>
    </div>
  )
}

export default DeliverySignup

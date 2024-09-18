import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
// import { front_assets } from '../../assets/frontend_assets/front_assets';

const LoginPopup = () => {

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
        newURL += "/api/user/login";

        const response = await axios.post(newURL, data) ;

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        }
        else{
            alert(response.data.message);
        }

    }

  return (
    <div className='login-popup'>
        <div className="login-container">
        <Link to='/'>
            <div className='login-logo-line'>
                <img className='login-logo-img' src="./logo.png" alt="" /> <h2>Midnight bites</h2>
            </div>
        </Link>
        <form onSubmit={onLogin} action="" className="login-popup-container">
        
            <div className="login-popup-title">
                <h2>Login</h2>
            </div>
            <div className="login-popup-inputs">
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit' >Login</button>
            <p>Create a new Account ? <Link to='/signup'><span> Click here</span></Link></p>
            
            
        </form>
        </div>
    </div>
  )
}

export default LoginPopup

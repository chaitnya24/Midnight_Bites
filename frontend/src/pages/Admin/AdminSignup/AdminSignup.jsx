import React, { useContext, useState } from 'react'
import './AdminSignup.css'
import { StoreContext } from '../../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
// import { front_assets } from '../../../assets/frontend_assets/front_assets';
// import { admin_assets } from '../../../assets/admin_assets/admin_assets';

const AdminSignup = () => {

    const {url} = useContext(StoreContext)

    const [image, setImage] = useState(false)

    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        shop:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}));
    }

    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("shop", data.shop)
        formData.append("image", image)

        const response = await axios.post(`${url}/api/admin/register`, formData);
        if (response.data.success) {
            navigate("/admin-login");
            setData({
                name: "",
                email: "",
                password: "",
                shop: ""
            })
            setImage(false);
            toast.success(response.data.message);

        } else {
            toast.error(response.data.message);
        }
    }

  return (
    <div className='admin-signup-popup'>
        <div className="admin-signup-container">
        <Link to='/'>
            <div className='admin-signup-logo-line'>
                <img className='admin-signup-logo-img' src="./logo.png" alt="" /> <h2>Midnight bites</h2>
            </div>
        </Link>
        <form onSubmit={onSubmitHandler} action="" className="admin-signup-popup-container">
            <div className="admin-signup-popup-title">
                <h2>Admin Sign Up</h2>
            </div>
            <div className="admin-signup-popup-inputs">
                <label htmlFor="image">
                    <p>Import your shop's logo here.</p>
                    <img src={image ? URL.createObjectURL(image) : "./upload_area.png" } alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />

                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                <input name='shop' onChange={onChangeHandler} value={data.shop} type="text" placeholder='Shop Name' required />

            </div>
            <button type='submit' >Create Account</button>
            <div className="admin-signup-popup-condition">
                <input type="checkbox" required />
                <p>By coutinuing, i agree to the terms of use & privacy policy</p>
            </div>
        </form>
        </div>
    </div>
  )
}

export default AdminSignup

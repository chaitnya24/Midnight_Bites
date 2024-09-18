import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Verify = () => {


  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify", {success, orderId});
    if (response.data.success) {
      navigate("/myorders");
    }else{
      navigate("/");
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
    <NavBar/>
    <div className='verify'>
      <div className="spinner">
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Verify

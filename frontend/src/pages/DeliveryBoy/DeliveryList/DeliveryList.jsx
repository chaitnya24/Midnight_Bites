import React, { useContext } from 'react'
import './DeliveryList.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
// import { admin_assets } from '../../../assets/admin_assets/admin_assets'
import DeliveryNavbar from '../../../components/DeliveryNavbar/DeliveryNavbar'
import { StoreContext } from '../../../context/StoreContext'

const DeliveryList = ({url}) => {

  const {token} = useContext(StoreContext);

  const[ name, setName ] = useState("");

    const [ orders, setOrders ] = useState([]);
    
    const fetchAllOrders = async () => {
      const response = await axios.get(url+"/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      }
      else{
        toast.error("Error")
      }
    }

    const fetchName = async (token) => {
      const response = await axios.post(`${url}/api/delivery/get`,{},{headers:{token}});
      setName(response.data.name);
    }
  
    const nullOrders = orders.filter((order) => order.deliveryBy === "");

    const orderHandler = async (ordersId, name, token) => {
      console.log(ordersId);
      const response = await axios.post(url+"/api/order/update",{ ordersId, deliveryBy:name })
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
    }

      if (response.data.success) {
        await fetchAllOrders();
        await fetchName(token);
      }
    }
  
    useEffect(() => {
      fetchAllOrders();
      fetchName(token);
    },[])
  
    return (
      <>
      <DeliveryNavbar />
      <div className='delivery-list-page'>
        <h3>Order Page</h3>
        <div className="delivery-list-list">
          {nullOrders.map((order, index) => (
            <div key={index} className="delivery-list-item">
              <img src="../../parcel_icon.png" alt="" />
              <div>
                <p className='delivery-list-item-food'>
                    {order.items.map((item, index) => {
                        if (index===order.items.length-1) {
                          return `${item.name} x ${item.quantity} - ${item.shop}` ;
                        } 
                        else {
                          return `${item.name} x ${item.quantity} - ${item.shop}, ` ;
                        }
                    })}
                </p>
                <p className='delivery-list-item-name'> {order.address.firstName+" "+order.address.lastName} </p>
                <div className="delivery-list-item-address">
                  <p>{order.address.street+", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='delivery-list-item-phone'> {order.address.phone} </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>₹{order.amount}</p>
              <button onClick={()=>{orderHandler(order._id, name, token)}} >Take Order</button>
            </div>
          ))}
        </div>      
      </div>
      </>
    )
}

export default DeliveryList

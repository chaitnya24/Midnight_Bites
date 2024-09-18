import React, { useContext } from 'react'
import './DeliveryPage.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
// import { admin_assets } from '../../../assets/admin_assets/admin_assets'
import DeliveryNavbar from '../../../components/DeliveryNavbar/DeliveryNavbar'
import { StoreContext } from '../../../context/StoreContext'

const DeliveryPage = ({url}) => {

    const [orders, setOrders ] = useState([]);

    const {token} = useContext(StoreContext);

    const[ name, setName ] = useState("");
    
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

    const deliveryOrders = orders.filter((order) => order.deliveryBy === name);
    const invertedOrders = deliveryOrders.map((_, index) => deliveryOrders[deliveryOrders.length - 1 - index]);
  
    const statusHandler = async (event, orderId) => {
      const response = await axios.post(url+"/api/order/status",{
        orderId,
        status : event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
      }
    }
  
    useEffect(() => {
      fetchAllOrders();
      fetchName(token);
    },[])
  
    return (
      <>
      <DeliveryNavbar />
      <div className='delivery-order-page'>
        <h3>Order Page</h3>
        <div className="delivery-order-list">
          {invertedOrders.map((order, index) => (
            <div key={index} className="delivery-order-item">
              <img src="../../parcel_icon.png" alt="" />
              <div>
                <p className='delivery-order-item-food'>
                    {order.items.map((item, index) => {
                      if (index===order.items.length-1) {
                          return `${item.name} x ${item.quantity} - ${item.shop} \n` ;
                        } 
                        else {
                          return `${item.name} x ${item.quantity} - ${item.shop}, \n` ;
                        }
                    })}
                </p>
                <p className='delivery-order-item-name'> {order.address.firstName+" "+order.address.lastName} </p>
                <div className="delivery-order-item-address">
                  <p>{order.address.street+", "}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='delivery-order-item-phone'> {order.address.phone} </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} >
              <option value="Ordered">Ordered</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>      
      </div>
      </>
    )
}

export default DeliveryPage

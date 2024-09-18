import React, { useContext } from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
import { StoreContext } from '../../../context/StoreContext'

const Order = ({url}) => {

  const [orders, setOrders ] = useState([]);

  const { shopName } = useContext(StoreContext);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }
 
  const invertedOrders = orders.map((_, index) => orders[orders.length - 1 - index]);
  console.log(invertedOrders);

  const currentShop = shopName; // dynamically set this for each shop
  const filteredOrders = orders.map(order => {
  const filteredItems = order.items.filter(item => item.shop === currentShop);
  
  // Return the order only if there are items from the current shop
    return filteredItems.length ? { ...order, items: filteredItems } : null;
  }).filter(order => order !== null); // Filter out empty orders

  // Now `filteredOrders` will only contain orders relevant to the current shop.
  console.log(filteredOrders);

  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <>
    <AdminNavbar />
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {invertedOrders.map((order, index) => (
          <div key={index} className="order-item">
            <img src="../../parcel_icon.png" alt="" />
            <div>
              <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if(item.shop === shopName) {
                      if (index === order.items.length-1) {
                        return item.name + " x " + item.quantity;
                      } 
                      else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    }  
                  })}
              </p>
              <p className='order-item-name'> {order.address.firstName+" "+order.address.lastName} </p>
              <div className="order-item-address">
                <p>{order.address.street+", "}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'> {order.address.phone} </p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
          </div>
        ))}
      </div>      
    </div>
    </>
  )
}

export default Order

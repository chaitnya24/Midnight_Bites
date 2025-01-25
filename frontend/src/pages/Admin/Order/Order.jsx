import React, { useContext } from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
import { StoreContext } from '../../../context/StoreContext'

const Order = ({url}) => {

  const { shopName } = useContext(StoreContext);

  let [orders, setOrders ] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }
 
  console.log(shopName);

  const filterOrdersByShop = (orders, shopName) => {

    return orders.map(order => {
        // Filter items that belong to the current shop
        const filteredItems = order.items.filter(item => item.shop === shopName);
  
        // If no items match the current shop, return null
        if (filteredItems.length === 0) {
          return null;
        }
  
        // Return a new order object with only the relevant items
        return {
          ...order,
          items: filteredItems
        };
      })
      .filter(order => order !== null); // Remove null entries
  };
  
  // Call the function to filter orders for the current shop
  const filteredOrders = filterOrdersByShop(orders, shopName);
  
  // Output the result to see what orders and items are visible for shop1
  console.log(filteredOrders);



  const invertedOrders = filteredOrders.map((_, index) => orders[orders.length - 1 - index]);
  console.log(invertedOrders);


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

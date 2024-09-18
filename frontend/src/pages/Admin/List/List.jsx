import React, { useEffect,useContext, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar'
import { StoreContext } from '../../../context/StoreContext'

const List = ({url}) => {

  const { fetchFoodList, shopName, food_list } = useContext(StoreContext);

  // const [shopName, setShopName ] = useState("");

  // const [list, setlist] = useState([]);

  // const fetchList = async () => {
  //   const response = await axios.get(`${url}/api/food/list`);
  //   if (response.data.success) {
  //     setlist(response.data.data);
  //   }
  //   else {
  //     toast.error("Error");
  //   }
  // }

  // const fetchShopName = async (token) => {
  //   const response = await axios.post(`${url}/api/admin/get`,{},{headers:{token}});
  //   setShopName(response.data.shop);
  // }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchFoodList();
    if(response.data.success) {
      toast.success(response.data.message);
    }
    else{
      toast.error("Error");
    }
  }

  console.log(shopName);
  const finalList = food_list.filter((item) => (item.shop === shopName));

  // useEffect(() => {
  //   fetchList();
  //   fetchShopName(token);
  // }, [])


  return (
    <>
    <AdminNavbar />
    <div className='list add flex-col' >
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Shop</b>
            <b>Action</b>
        </div>
        {finalList.map((item,index) => {
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p>{item.shop}</p>
              <p onClick={() => removeFood(item._id)} className='cursor' >X</p>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default List

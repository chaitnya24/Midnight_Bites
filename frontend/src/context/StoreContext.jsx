import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});

  const url = "http://localhost:4000";

  const [token, setToken] = useState("");

  const [ shopName, setShopName ] = useState("");

  const [ food_list, setFoodList ] = useState([]);

  const [ shopList, setShopList ] = useState([]);

  let [ deliveryList , setDeliveryList ] = useState([]);

  const [ orderData, setOrderData] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      
    }
  }

  const RemoveFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item );
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  }

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }

  const fetchShopList = async () => {
    const response = await axios.get(url+"/api/admin/list");
    setShopList(response.data.data);
  }

  const fetchDeliveryList = async () => {
    const response = await axios.get(url+"/api/delivery/list");
    setDeliveryList(response.data.data);
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  const fetchOrders = async (token) => {
    const response = await axios.post(url+"/api/order/userorder",{},{headers:{token}});
    setOrderData(response.data.data);
}


  useEffect(()=> {
    
    async function loadData() {
      await fetchFoodList();
      await fetchShopList();
      await fetchDeliveryList();
      
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
        await fetchOrders(localStorage.getItem("token"));
      } 
    }
    loadData();

  }, [])

  const Contextvalue = {
    food_list,
    shopList,
    shopName,
    cartItems,
    deliveryList,
    setCartItems,
    addToCart,
    RemoveFromCart,
    getTotalCartAmount,
    fetchFoodList,
    url,
    token,
    setToken,
    orderData,
    setOrderData,
    setShopName,
    setDeliveryList
  };
  return (
    <StoreContext.Provider value={Contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

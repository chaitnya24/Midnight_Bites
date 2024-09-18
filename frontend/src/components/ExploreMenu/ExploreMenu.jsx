import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../context/StoreContext'


const ExploreMenu = ({shop, setShop}) => {

    const { shopList, url } = useContext(StoreContext)    

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Nearby Shops</h1>
        <p className='explore-menu-text'>
            Explore nearby shops with Midnight Bites! Easily find and order from local favorites,
             whether you're craving a quick snack or a hearty meal. Enjoy the convenience of 
             having delicious food delivered straight to your hostel.</p>
        <div className='explore-menu-list'>
            {shopList.map((item,index) => {
                return (
                    <div onClick={()=>setShop(prev => prev === item.shop?"All":item.shop)} key={index} className='explore-menu-list-item'>
                        <img className={shop===item.shop?"active":""} src={url+"/shop-images/"+item.image} alt=''/>
                        <p>{item.shop}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu

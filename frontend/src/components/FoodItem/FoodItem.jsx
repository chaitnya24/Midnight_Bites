import React, { useContext } from 'react'
import './FoodItem.css'
// import { front_assets } from '../../assets/frontend_assets/front_assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, shop, description, image }) => {

  const { cartItems, addToCart, RemoveFromCart, url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={url+"/images/"+image} />
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src="./add_icon_white.png" alt='' />
          : <div className='food-item-counter' >
            <img onClick={() => RemoveFromCart(id)} src="./remove_icon_red.png" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src="./add_icon_green.png" alt="" />

          </div>
        }
      </div>
      <div className='food-item-info'>
        <p className='food-item-shop' >{shop}</p>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src="./rating_starts.png" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₹{price}</p>

      </div>

    </div>
  )
}

export default FoodItem

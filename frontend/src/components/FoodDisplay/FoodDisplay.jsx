import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem.jsx'

const FoodDisplay = ({shop}) => {

  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you </h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if (shop === "All" || shop === item.shop) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} shop={item.shop} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

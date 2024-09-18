import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import Footer from '../../components/Footer/Footer.jsx';

const Home = () => {

      const [shop, setShop] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu shop={shop} setShop={setShop}/>
      <FoodDisplay shop={shop} /> 
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default Home

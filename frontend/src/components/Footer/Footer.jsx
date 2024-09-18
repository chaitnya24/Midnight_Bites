import React from 'react'
import './Footer.css'
// import { front_assets } from '../../assets/frontend_assets/front_assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className='footer-logo-line'>
          <img className='logo-img' src="./logo.png" alt="" /> <h2>Midnight bites</h2>
          </div>
          <p>Catering to your late-night cravings. Delivering delicious meals to hostel students from the best nearby shops and restaurants.</p>
          <div className="footer-social-icons">
            <img src="./facebook_icon.png" alt="" />
            <img src="./twitter_icon.png" alt="" />
            <img src="./linkedin_icon.png" alt="" />
          </div>  
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-212-456-7890</li>
              <li>contect@midbites.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Midbites.com - All Right Reserved.</p>
      
    </div>
  )
}

export default Footer

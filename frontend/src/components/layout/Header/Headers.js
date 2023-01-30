import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import logo from "../../images/logo.png"
import { FaUserAlt, FaCartPlus, FaSearch } from "react-icons/fa";
export default function Headers() {
 
  return (
    <ReactNavbar
     
      burgerColor="#097"
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoColor="#000000"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIconUrl="/login"
      cartIconMargin="1vmax"
      profileIconMargin="0.5vmax"
      searchIconColor="#121212"
      cartIconColor="#121212"
      profileIconColor="#121212"
      searchIconColorHover="crimson"
      cartIconColorHover="crimson"
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      cartIcon={true}
      CartIconElement={FaCartPlus}
      searchIcon={true}
      SearchIconElement={FaSearch}
      id="nav"
    />
  );
}

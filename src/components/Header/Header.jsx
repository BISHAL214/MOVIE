import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.scss";

import { ContentWrapper } from '../index'
import logo from '../../assets/movix-logo.svg'


const Header = () => {


  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const controlNavbar = () => {
    if(window.scrollY > 200) {
      if(window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide")
      } else {
        setShow("top")
      }
    } else {
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => ( window.removeEventListener("scroll", controlNavbar) );
  }, [lastScrollY])
  

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const searchQueryHandle = (event) => {  
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`)

        setTimeout(() => {
          setShowSearch(false)
        }, 1000)
    }
  }

  const navigationHandler = (type) => {
    if(type === "movie") {
      navigate("/explore/movie")
    }
    else {
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  const navigateHome = () => {
    navigate("/");
    setMobileMenu(false)
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>

      <ContentWrapper>

        <div className="logo">
          {/* <img src={logo} alt="movix-logo" /> */}
        </div>

        <ul className="menuItems">
          <li className="eachItem" onClick={() => navigateHome()}> Home </li>
          <li className="eachItem" onClick={() => navigationHandler('movie')}> Movies </li>
          <li className="eachItem" onClick={() => navigationHandler('tv')}> TV Shows </li>
          <li className="eachItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>

      </ContentWrapper>

      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className='searchInput'>
            <input
              type="text"
              placeholder='Search for movies or TV shows......'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandle}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}

    </header>
  );
};

export default Header;

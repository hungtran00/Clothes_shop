import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/HeaderHome.css";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN, USER_LOGIN, removeStore } from "../../util/config";
const HeaderHome = () => {
  const { userLogin, valid } = useSelector((state) => state.userReducer);
  const { totalQuantity } = useSelector((state) => state.productReducer);
  const [active,setActive] = useState(false)
  const handleClick = (e) => {
    if (userLogin.email) {
      valid = false;
    } else {
      valid = true;
    }
    if (valid) {
      e.preventDefault();
    }
  };
  const renderLoginButton = () => {
    if (userLogin) {
      return (
        <>
          <NavLink to="/profile" className="nav-link text-white">
            <div className="profile-name">


            Hello ! {userLogin.email}
            </div>
          </NavLink>
          <NavLink
            to="/register"
            className="item-list"
            onClick={() => {
              removeStore(ACCESS_TOKEN);
              removeStore(USER_LOGIN);
              window.location.reload();
            }}
          >
            Log out
          </NavLink>
        </>
      );
    }
    return (
      <>
        <NavLink to="/login" className="nav-link mx-3 header-login">
          Login
        </NavLink>
        <NavLink to="/register" className="item-list">
          Register
        </NavLink>
      </>
    );
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <NavLink to="">
              <img src="./image/image 3.png" alt="logo" />
            </NavLink>
          </div>
          <div className="header-right">
            <NavLink to="/search" className="item-list">
              <i class="fa fa-search"></i> Search
            </NavLink>
          
            <NavLink className="num" to="/carts" onClick={handleClick} >
            <i class="fa fa-shopping-cart"></i>  
              ({totalQuantity})
            </NavLink>
            {/* <NavLink to="/login" className="item-list">
              Login
            </NavLink> */}
            {renderLoginButton()}
          </div>
        </div>
      </header>
      <section className="nav">
        <nav className="nav-content">
          <NavLink to="" className="nav-item nav-item-custom" >
            Home
          </NavLink>
          <NavLink to="" className="nav-item nav-item-custom">
            Men
          </NavLink>
          <NavLink to="" className="nav-item nav-item-custom">
            Woman
          </NavLink>
          <NavLink to="" className="nav-item nav-item-custom">
            Kid
          </NavLink>
          <NavLink to="" className="nav-item nav-item-custom">
            Sport
          </NavLink>
        </nav>
      </section>
    </div>
  );
};

export default HeaderHome;

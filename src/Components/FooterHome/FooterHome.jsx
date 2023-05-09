import React from "react";
import "../../assets/css/FooterHome.css";
const FooterHome = () => {
  return (
    <div>
      <div className="row footer-head">
        <div className="col-lg-4 col-md-4 col-xl-4 col-xs-4 block-content">
          <div className="content">
            <h3>GET HELP</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Nike</a></li>
              <li><a href="#">Adidas</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-xl-4 col-xs-4  block-content">
          <div className="content">
            <h3>SUPPORT</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">Phone</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-xl-4 col-xs-4 block-content">
          <div className="content">
            <h3>REGISTER</h3>
            <ul>
              <li><a href="#">Register</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-body">
        <p>
          ©2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
          Khải.
        </p>
      </div>
    </div>
  );
};

export default FooterHome;

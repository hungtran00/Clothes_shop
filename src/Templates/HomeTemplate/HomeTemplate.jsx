import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../../Components/HeaderHome/HeaderHome";
import FooterHome from "../../Components/FooterHome/FooterHome";
export const HomeTemplate = () => {
  return (
    <>
      <HeaderHome />
      <div style={{ minHeight: "75vh" }}>
        {/* Outlet sẽ là nơi chứa nội dung các component Pages */}
        <Outlet />
      </div>
      <FooterHome />
    </>
  );
};

import React from "react";
import "./Styles/Sidebar.css";
import SidebarAuth from "../Auth/SidebarAuth";

const Sidebar = ({ userInfo }) => {
  return userInfo ? (
    <div className="sidebar">
      <SidebarAuth userInfo={userInfo} />
    </div>
  ) : null;
};

export default Sidebar;

import React from "react";
import "./Styles/Navbar.css";
import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavAuthOption from "../Auth/NavAuthOptions";
import { CgSidebarOpen } from "react-icons/cg";

const NavigationBar = ({ handleShow }) => {
  const { userInfo } = useSelector((state) => state.userSignin);
  console.log(userInfo);
  return (
    <Navbar bg="info" variant="light" expand="lg" fixed="top">
      <CgSidebarOpen
        onClick={handleShow}
        className="menu-icon"
        size="35px"
        color="rgba(0,0,0,0.7)"
      />
      <Navbar.Brand>A S K - HOSPITAL</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <NavAuthOption />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;

import React, { useState } from "react";
import "./Styles/Sidenav.css";
import { Button, Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import SideNavAuth from "../Auth/SideNavAuth";
import NavigationBar from "./NavigationBar";

const Layout = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <NavigationBar handleShow={handleShow} />

      {userInfo ? (
        <>
          <div className="sidenav">
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement="start"
              scroll="false">
              <div>
                <Offcanvas.Header>
                  <Offcanvas.Title>Service Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <SideNavAuth userInfo={userInfo} />
                </Offcanvas.Body>
              </div>
            </Offcanvas>
          </div>
          <div className="">{children}</div>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;

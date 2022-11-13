import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const AuthOptions = ({ userInfo, logOut }) => {
  const admin = userInfo.user.role === "Admin";
  return (
    <Navbar.Collapse className="justify-content-end mr-3">
      <Nav>
        <Nav.Link as={Link} className="mr-3 " to="/home">
          Home
        </Nav.Link>
        <NavDropdown title="Team" id="basic-nav-dropdown" className="mr-3">
          {admin && (
            <NavDropdown.Item as={Link} to="/userList">
              Users
            </NavDropdown.Item>
          )}
          <NavDropdown.Item as={Link} to="/doctorsList">
            Doctors
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/employeesList">
            Employees / Staffs
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/wardensList">
            Warden / Helpers
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title="Facilities"
          id="basic-nav-dropdown"
          className="mr-3">
          <NavDropdown.Item as={Link} to="/ambulanceService">
            Ambulance Services
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/wardsList">
            Wards
          </NavDropdown.Item>
        </NavDropdown>
        <div className="hide">
          <Nav>
            <Nav.Link as={Link} to="/branchList" className="mr-3 ">
              Branches
            </Nav.Link>
            <Nav.Link as={Link} className="mr-3" to="/contactUs">
              Contact Us
            </Nav.Link>
          </Nav>
        </div>
        <Nav.Link className="mr-1">
          <BsPersonCircle size="18px" /> {userInfo && userInfo.user.name} [{" "}
          <small>{userInfo && userInfo.user.role}</small> ]
        </Nav.Link>
        <Nav.Link onClick={logOut}>
          Logout
          <FaPowerOff
            size="18px"
            style={{ marginRight: "10px", marginLeft: "5px" }}
          />
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );
};

export default AuthOptions;

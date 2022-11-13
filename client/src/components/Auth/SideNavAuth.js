import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNavAuth = ({ userInfo }) => {
  return (
    <div className="sidenav">
      <div className="top-menu">
        <span>Services</span>
        <Link to="/appointmentList">
          <Button variant="default">Appointments</Button>
        </Link>
        <Link to="/patientList">
          <Button variant="default">Patients</Button>
        </Link>
        <Link to="/labRoomList">
          <Button variant="default">Laboratory</Button>
        </Link>
        {userInfo.user.role === "Admin" ? (
          <>
            <span>Faculties</span>
            <Link to="/departmentList">
              <Button variant="default">Departments</Button>
            </Link>
            <Link to="/designationList">
              <Button variant="default">Designations</Button>
            </Link>
          </>
        ) : (
          <div className="userMenu"></div>
        )}
      </div>
      <div className="bottom-menu">
        <Link to="/branchList">
          <Button variant="default">Branches</Button>
        </Link>
        <Link to="/contactUs">
          <Button variant="default">Contact</Button>
        </Link>
      </div>
    </div>
  );
};

export default SideNavAuth;

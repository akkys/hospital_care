import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const SidebarAuth = ({ userInfo }) => {
  return (
    <>
      <div className="top-menu">
        <div className="">
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
        </div>
        {userInfo && userInfo.user.role === "Admin" ? (
          <div className="mt-2">
            <span>Faculties</span>
            <Link to="/departmentList">
              <Button variant="default">Departments</Button>
            </Link>
            <Link to="/designationList">
              <Button variant="default">Designations</Button>
            </Link>
          </div>
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
    </>
  );
};

export default SidebarAuth;

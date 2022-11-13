import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentPage from "./components/Components/Appointments/AppointmentPage";
import BranchPage from "./components/Components/Branches/BranchPage";
import DepartmentPage from "./components/Components/Departments/DepartmentPage";
import DesignationPage from "./components/Components/Designations/DesignationPage";
import DoctorPage from "./components/Components/Doctors/DoctorPage";
import EmployeePage from "./components/Components/Employees/EmployeePage";
import LabRoomPage from "./components/Components/LabRooms/LabRoomPage";
import PatientPage from "./components/Components/Patients/PatientPage";
import UsersPage from "./components/Components/Users/UsersPage";
import WardenPage from "./components/Components/Wardens/WardenPage";
import WardPage from "./components/Components/Wards/WardPage";
import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Layout/Sidebar";
import TopBar from "./components/Layout/TopBar";
import AmbulanceService from "./components/Pages/AmbulanceService";
import ContactUs from "./components/Pages/ContactUs";
import HomePage from "./components/Pages/HomePage";

const Routers = () => {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <BrowserRouter>
      <TopBar />
      <Layout>
        <Sidebar userInfo={userInfo} />
        <div
          className={
            userInfo ? `main-menu home-container` : `home-container container`
          }>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/patientList" element={<PatientPage />} />
            <Route exact path="/labRoomList" element={<LabRoomPage />} />
            <Route exact path="/userList" element={<UsersPage />} />
            <Route exact path="/employeesList" element={<EmployeePage />} />
            <Route exact path="/wardensList" element={<WardenPage />} />
            <Route exact path="/doctorsList" element={<DoctorPage />} />
            <Route exact path="/wardsList" element={<WardPage />} />
            <Route exact path="/branchList" element={<BranchPage />} />
            <Route exact path="/contactUs" element={<ContactUs />} />
            <Route
              exact
              path="/ambulanceService"
              element={<AmbulanceService />}
            />
            <Route exact path="/departmentList" element={<DepartmentPage />} />
            <Route
              exact
              path="/designationList"
              element={<DesignationPage />}
            />
            <Route
              exact
              path="/appointmentList"
              element={<AppointmentPage />}
            />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default Routers;

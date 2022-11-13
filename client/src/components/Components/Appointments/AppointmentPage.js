import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAppointment,
  deleteAppointment,
  listAppointments,
} from "../../../actions/AppointmentAction";
import { listDepartments } from "../../../actions/DepartmentAction";
import { listDoctors } from "../../../actions/DoctorAction";
import DataList from "../../../misc/DataList";
import EmptyData from "../../../misc/EmptyData";
import InputComp from "../../../misc/InputComp";
import InputTime from "../../../misc/InputTime";
import TableHeader from "../../../misc/TableHeader";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import PaginationButton from "../../Layout/PaginationButton";
import LoadingPage from "../../Pages/LoadingPage";
import AppointmentList from "./AppointmentList";

const AppointmentPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [reason, setReason] = useState("");
  const [docName, setDocName] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [filteredAppt, setFilteredAppt] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(10);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { appointments, loading } = useSelector(
    (state) => state.appointmentList
  );
  const { doctors } = useSelector((state) => state.doctorList);
  const { departments } = useSelector((state) => state.departmentList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.appointmentAdd
  );

  console.log("appt", appointments);
  console.log("err", errorSave);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Appointments | A S K Hospitals";
    dispatch(listAppointments());
    dispatch(listDoctors());
    dispatch(listDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listAppointments());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    setFilteredAppt(
      appointments.filter((appointment) => {
        return (
          appointment.contact.includes(search) ||
          appointment.email.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, appointments]);

  const openModal = (appointment) => {
    if (appointment._id) {
      setModalVisible(true);
      setId(appointment._id);
      setName(appointment.name);
      setEmail(appointment.email);
      setContact(appointment.contact);
      setAddress(appointment.address);
      setCity(appointment.city);
      setZipcode(appointment.zipcode);
      setDate(appointment.date);
      setFromTime(appointment.fromTime);
      setToTime(appointment.toTime);
      setDepartment(appointment.department);
      setReason(appointment.reason);
      setDocName(appointment.docName);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setEmail();
      setContact();
      setAddress();
      setCity();
      setZipcode();
      setDate();
      setFromTime();
      setToTime();
      setDepartment();
      setReason();
      setDocName();
    }
  };

  const reasons = [
    "A New Patient Appointment",
    "A Routine Checkup",
    "A Comprehensive Health Exam",
  ];

  const statusList = ["Scheduled", "Confirmed", "Processing", "Completed"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      _id: id,
      name,
      email,
      contact,
      date,
      fromTime,
      toTime,
      department,
      address,
      city,
      zipcode,
      docName,
      reason,
      status,
    };

    dispatch(addAppointment(appointment));
  };

  const deleteHandler = (appointment) => {
    dispatch(deleteAppointment(appointment._id));
    dispatch(listAppointments());
  };

  const contents = [
    "#",
    "Date/Time",
    "Name",
    "Contact & Email",
    "Type",
    "Department",
    "Status",
    "Edit",
    "More",
  ];

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult = filteredAppt.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < appointments.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const appointmentData = currentResult.map((appointment, i) => {
    return (
      <AppointmentList
        key={i}
        index={i + 1}
        appt={appointment}
        openModal={openModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={appointments}
        title="Appointments"
        openModal={openModal}
        search={search}
        setSearch={setSearch}
        placeholder="Search by Contact or Email..."
        userInfo={userInfo}
        admin={userInfo.user.role === "Admin"}
        user={userInfo.user.role === "User"}
      />

      {currentResult.length === 0 ? (
        <EmptyData
          name="Appointment"
          title="Make your first appointment now!"
          data={appointments}
          openModal={openModal}
          userInfo={userInfo}
          admin={userInfo.user.role === "Admin"}
          user={userInfo.user.role === "User"}
        />
      ) : (
        <div className=" ">
          {search && <h5>Search result : {currentResult.length}</h5>}
          <TableHeader avatar contents={contents} data={appointmentData} />
        </div>
      )}
      <PaginationButton
        PerPage={resultPerPage}
        total={appointments.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        perPageLength={currentResult.length}
      />
      {modalVisible && (
        <ModalContainer
          title="Appointment"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="lg"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <Row>
            <Col md={6}>
              <InputComp
                label="Patient Name"
                inputType="text"
                type="text"
                value={name}
                setValue={setName}
                placeholder="Enter Full Name"
                err={errorSave}
              />
              <InputComp
                label="Email"
                inputType="text"
                type="email"
                value={email}
                setValue={setEmail}
                placeholder="example@email.com"
                err={errorSave}
              />
              <InputComp
                label="Contact Number"
                inputType="text"
                type="text"
                value={contact}
                setValue={setContact}
                placeholder="Enter Contact Number"
                err={errorSave}
              />
              <InputComp
                label="Schedule Date"
                inputType="text"
                type="date"
                value={date}
                setValue={setDate}
                err={errorSave}
              />
              <InputTime
                label1="From Time"
                label2="To Time"
                inputType="text"
                type="time"
                value1={fromTime}
                setValue1={setFromTime}
                value2={toTime}
                setValue2={setToTime}
                err={errorSave}
              />
            </Col>
            <Col md={6}>
              <DataList
                value={docName}
                setValue={setDocName}
                label="Doctor Name"
                data={doctors}
                err={errorSave}
              />
              <DataList
                value={department}
                setValue={setDepartment}
                label="Department Name"
                data={departments}
                err={errorSave}
              />
              <InputComp
                label="Patient Address"
                inputType="text"
                type="text"
                value={address}
                setValue={setAddress}
                placeholder="Enter Address Line"
                err={errorSave}
              />
              <InputComp
                label="City"
                inputType="text"
                type="text"
                value={city}
                setValue={setCity}
                placeholder="Enter City"
                err={errorSave}
              />
              <InputComp
                label="Zipcode"
                inputType="text"
                type="text"
                value={zipcode}
                setValue={setZipcode}
                placeholder="Enter Zipcode"
                err={errorSave}
              />
            </Col>
          </Row>
          <InputComp
            label="I Would Like To"
            inputType="select"
            data={reasons}
            value={reason}
            setValue={setReason}
            err={errorSave}
          />
          <InputComp
            label="Status"
            inputType="select"
            data={statusList}
            value={status}
            setValue={setStatus}
            err={errorSave}
          />
        </ModalContainer>
      )}
    </>
  );
};

export default AppointmentPage;

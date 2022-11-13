import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listDoctors } from "../../../actions/DoctorAction";
import {
  addPatient,
  deletePatient,
  listPatients,
} from "../../../actions/PatientAction";
import { listWards } from "../../../actions/WardAction";
import DataList from "../../../misc/DataList";
import EmptyData from "../../../misc/EmptyData";
import InputComp from "../../../misc/InputComp";
import TableHeader from "../../../misc/TableHeader";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import PaginationButton from "../../Layout/PaginationButton";
import LoadingPage from "../../Pages/LoadingPage";
import PatientList from "./PatientList";

const PatientPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [admitDate, setAdmitDate] = useState("");
  const [status, setStatus] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [roomType, setRoomType] = useState("");
  const [docName, setDocName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [admitReason, setAdmitReason] = useState("");
  const [pastMedication, setPastMedication] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPatient, setFilteredPatient] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(10);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, patients } = useSelector((state) => state.patientList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.patientAdd
  );
  const { doctors } = useSelector((state) => state.doctorList);
  const { wards } = useSelector((state) => state.wardList);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Patients | A S K Hospitals";
    dispatch(listPatients());
    dispatch(listDoctors());
    dispatch(listWards());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listPatients());
    }
  }, [dispatch, successSave]);

  //Search filter
  useEffect(() => {
    setFilteredPatient(
      patients.filter((patient) => {
        return (
          patient.pid.includes(search) ||
          patient.contact.toLowerCase().includes(search.toLowerCase()) ||
          patient.name.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, patients]);

  const genders = ["Male", "Female", "Others"];
  const patientStatus = ["Treating", "Discharged", "Under Observation"];

  const openModal = (patient) => {
    if (patient._id) {
      setModalVisible(true);
      setId(patient._id);
      setPid(patient.pid);
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
      setContact(patient.contact);
      setAddress(patient.address);
      setAdmitDate(patient.admitDate);
      setStatus(patient.status);
      setRoomNum(patient.roomNum);
      setRoomType(patient.roomType);
      setDocName(patient.docName);
      setDob(patient.dob);
      setBloodGroup(patient.bloodGroup);
      setEmergencyContact(patient.emergencyContact);
      setEmergencyName(patient.emergencyName);
      setMaritalStatus(patient.maritalStatus);
      setRelationship(patient.relationship);
      setAdmitReason(patient.admitReason);
      setPastMedication(patient.pastMedication);
    } else {
      setModalVisible(true);
      setId();
      setPid();
      setName();
      setAge();
      setGender();
      setContact();
      setAddress();
      setAdmitDate();
      setStatus();
      setRoomNum();
      setRoomType();
      setDocName();
      setDob();
      setBloodGroup();
      setEmergencyContact();
      setEmergencyName();
      setMaritalStatus();
      setRelationship();
      setAdmitReason();
      setPastMedication();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = {
      _id: id,
      pid,
      name,
      age,
      gender,
      contact,
      address,
      admitDate,
      roomNum,
      roomType,
      status,
      docName,
      dob,
      bloodGroup,
      emergencyContact,
      emergencyName,
      relationship,
      maritalStatus,
      admitReason,
      pastMedication,
    };
    dispatch(addPatient(patient));
  };

  const deleteHandler = (patient) => {
    dispatch(deletePatient(patient._id));
    dispatch(listPatients());
  };

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult = filteredPatient.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < patients.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const patientListData = currentResult.map((patient, index) => {
    return (
      <PatientList
        key={index}
        index={index + 1}
        patient={patient}
        openModal={openModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  const contents = [
    "#",
    "PID",
    "Name",
    "Admission Date",
    "Room No",
    "Status",
    "Edit",
    "More",
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const maritalStatusList = ["Single", "Married", "Widowed", "Divorced"];

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <PageHeader
        data={patients}
        title="Patients"
        openModal={openModal}
        search={search}
        setSearch={setSearch}
        placeholder="Search by PID or Name or Contact..."
        userInfo={userInfo}
        admin={userInfo.user.role === "Admin"}
        user={userInfo.user.role === "User"}
      />
      {currentResult.length === 0 ? (
        <EmptyData
          name="Patient"
          title="Add the patient's details now!"
          data={patients}
          userInfo={userInfo}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
          user={userInfo.user.role === "User"}
        />
      ) : (
        <div>
          {search && <h5>Search result : {currentResult.length}</h5>}
          <TableHeader avatar contents={contents} data={patientListData} />
        </div>
      )}

      <PaginationButton
        PerPage={resultPerPage}
        total={patients.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        perPageLength={currentResult.length}
      />
      {modalVisible && (
        <ModalContainer
          title="Patient"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="xl"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <Row>
            <Col md={4} style={{ borderRight: "1px solid rgb(206, 206, 206)" }}>
              <p>Patient Details</p>
              <InputComp
                label="Patient ID"
                inputType="text"
                type="text"
                value={pid}
                setValue={setPid}
                placeholder="Enter PID"
                err={errorSave}
              />
              <InputComp
                label="Name"
                inputType="text"
                type="text"
                value={name}
                setValue={setName}
                placeholder="Enter name"
                err={errorSave}
              />
              <InputComp
                label="Admission Date & Time"
                inputType="text"
                type="datetime-local"
                value={admitDate}
                setValue={setAdmitDate}
                err={errorSave}
              />
              <InputComp
                label="Status"
                data={patientStatus}
                inputType="select"
                value={status}
                setValue={setStatus}
                err={errorSave}
              />
              <InputComp
                label="Room No."
                inputType="text"
                type="text"
                value={roomNum}
                setValue={setRoomNum}
                placeholder="Enter room no."
                err={errorSave}
              />
              <DataList
                value={roomType}
                setValue={setRoomType}
                label="Room Type"
                data={wards}
                err={errorSave}
              />
              <DataList
                value={docName}
                setValue={setDocName}
                label="Treated By"
                data={doctors}
                err={errorSave}
              />
            </Col>
            <Col md={4} style={{ borderRight: "1px solid rgb(206, 206, 206)" }}>
              <p>Personal Details</p>
              <InputComp
                label="Date of Birth"
                inputType="text"
                type="date"
                value={dob}
                setValue={setDob}
                err={errorSave}
              />
              <InputComp
                label="Age"
                inputType="text"
                type="text"
                value={age}
                setValue={setAge}
                placeholder="Enter age"
                err={errorSave}
              />
              <InputComp
                label="Gender"
                data={genders}
                inputType="select"
                value={gender}
                setValue={setGender}
                err={errorSave}
              />
              <InputComp
                label="Blood Group"
                data={bloodGroups}
                inputType="select"
                value={bloodGroup}
                setValue={setBloodGroup}
                err={errorSave}
              />
              <InputComp
                label="Contact"
                inputType="text"
                type="text"
                value={contact}
                setValue={setContact}
                placeholder="Enter contact"
                err={errorSave}
              />
              <InputComp
                label="Address"
                inputType="textarea"
                type="textarea"
                value={address}
                setValue={setAddress}
                placeholder="Enter address"
                size="130px"
                err={errorSave}
              />
            </Col>
            <Col md={4}>
              <p>Personal Details</p>
              <InputComp
                label="Marital Status"
                data={maritalStatusList}
                inputType="select"
                value={maritalStatus}
                setValue={setMaritalStatus}
                err={errorSave}
              />
              <InputComp
                label="Admit Reason"
                inputType="text"
                type="text"
                value={admitReason}
                setValue={setAdmitReason}
                placeholder="Enter admit reason"
                err={errorSave}
              />
              <InputComp
                label="Taking any Medication currently? If Yes, please list here."
                inputType="textarea"
                type="text"
                value={pastMedication}
                setValue={setPastMedication}
                placeholder="Enter Past Medication"
                size="90px"
                err={errorSave}
              />
              <p>In case of emergency... (optional)</p>
              <InputComp
                label="Contact Name"
                inputType="text"
                type="text"
                value={emergencyName}
                setValue={setEmergencyName}
                placeholder="Enter emergency name"
                err={errorSave}
              />
              <InputComp
                label="Contact Number"
                inputType="text"
                type="text"
                value={emergencyContact}
                setValue={setEmergencyContact}
                placeholder="Enter emergency number"
                err={errorSave}
              />
              <InputComp
                label="Relationship"
                inputType="text"
                type="text"
                value={relationship}
                setValue={setRelationship}
                placeholder="Enter relationship"
                err={errorSave}
              />
            </Col>
          </Row>
        </ModalContainer>
      )}
    </>
  );
};

export default PatientPage;

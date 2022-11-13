import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctor,
  listDoctors,
  deleteDoctor,
} from "../../../actions/DoctorAction";
import { listUsers } from "../../../actions/UserAuthAction";
import DataList from "../../../misc/DataList";
import EmptyData from "../../../misc/EmptyData";
import InputComp from "../../../misc/InputComp";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import ScrollToTop from "../../Layout/ScrollToTOp";
import LoadingPage from "../../Pages/LoadingPage";
import DoctorList from "./DoctorList";

const DoctorPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [expert, setExpert] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [available, setAvailable] = useState("");
  const [exp, setExp] = useState("");
  const [contact, setContact] = useState("");
  const [qualification, setQualification] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);
  const { users } = useSelector((state) => state.userList);
  const { doctors, loading } = useSelector((state) => state.doctorList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.doctorAdd
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Doctors | A S K Hospitals";
    dispatch(listDoctors());
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listDoctors());
    }
  }, [dispatch, successSave]);

  const openModal = (doctor) => {
    if (doctor._id) {
      setModalVisible(true);
      setId(doctor._id);
      setName(doctor.name);
      setGender(doctor.gender);
      setExpert(doctor.expert);
      setAvailable(doctor.available);
      setExp(doctor.exp);
      setContact(doctor.contact);
      setDesc(doctor.desc);
      setTime(doctor.time);
      setQualification(doctor.qualification);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setGender();
      setExpert();
      setAvailable();
      setExp();
      setContact();
      setDesc();
      setTime();
      setQualification();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = {
      _id: id,
      name,
      gender,
      expert,
      available,
      exp,
      contact,
      desc,
      time,
      qualification,
    };
    dispatch(addDoctor(doctor));
  };

  const deleteHandler = (doctor) => {
    dispatch(deleteDoctor(doctor._id));
    dispatch(listDoctors());
  };

  const genders = ["Male", "Female", "Others"];
  const availables = ["Morning", "Afternoon", "Evening", "Night", "Full Day"];
  const experts = [
    "Cardiology",
    "Psychology",
    "Neurology",
    "Physiology",
    "Dermotology",
    "Surgeon",
    "Paramedic",
    "ENT",
    "Consulting",
    "Dietician",
  ];

  const doctorsListData = doctors.map((doctor) => {
    return (
      <DoctorList
        key={doctor._id}
        docs={doctor}
        userInfo={userInfo}
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
        data={doctors}
        title="Doctor"
        fullTitle="List of Doctors available in our Hospital"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
      />
      {doctors.length === 0 ? (
        <EmptyData
          name="Data"
          title="Add all the available doctors now!"
          data={doctors}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <Row>{doctorsListData}</Row>
      )}
      {modalVisible && (
        <ModalContainer
          title="Doctor"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="lg"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <Row>
            <Col md={6}>
              <DataList
                label="Emp Name"
                data={users}
                value={name}
                setValue={setName}
                err={errorSave}
              />
              <InputComp
                label="Gender"
                inputType="select"
                data={genders}
                value={gender}
                setValue={setGender}
                err={errorSave}
              />
              <InputComp
                label="Qualification"
                inputType="text"
                type="text"
                value={qualification}
                setValue={setQualification}
                placeholder="Enter Qualification"
                err={errorSave}
              />
              <InputComp
                label="Expertise In"
                inputType="select"
                data={experts}
                value={expert}
                setValue={setExpert}
                err={errorSave}
              />
              <InputComp
                label="Experience in Year"
                inputType="text"
                type="text"
                value={exp}
                setValue={setExp}
                placeholder="Enter exp"
                err={errorSave}
              />
            </Col>
            <Col md={6}>
              <InputComp
                label="Contact Number"
                inputType="text"
                type="text"
                value={contact}
                setValue={setContact}
                placeholder="Enter contact"
                err={errorSave}
              />
              <InputComp
                label="Availbale At"
                inputType="select"
                data={availables}
                value={available}
                setValue={setAvailable}
                err={errorSave}
              />
              <InputComp
                label="Available Times"
                inputType="text"
                type="text"
                value={time}
                setValue={setTime}
                placeholder="Enter time"
                err={errorSave}
              />
              <InputComp
                label="About"
                inputType="textarea"
                type="textarea"
                value={desc}
                setValue={setDesc}
                placeholder="Enter Desc"
                size="130px"
                err={errorSave}
              />
            </Col>
          </Row>
        </ModalContainer>
      )}
      <ScrollToTop />
    </>
  );
};

export default DoctorPage;

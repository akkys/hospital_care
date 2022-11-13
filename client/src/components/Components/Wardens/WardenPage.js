import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../../actions/UserAuthAction";
import {
  addWarden,
  deleteWarden,
  listWardens,
} from "../../../actions/WardenAction";
import EmptyData from "../../../misc/EmptyData";
import InputComp from "../../../misc/InputComp";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import LoadingPage from "../../Pages/LoadingPage";
import WardenList from "./WardenList";

const WardenPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [dob, setDob] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [genders] = useState(["Male", "Female", "Others"]);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { wardens, loading } = useSelector((state) => state.wardenList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.wardenAdd
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Wardens / Helpers | A S K Hospitals";
    dispatch(listWardens());
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listWardens());
    }
  }, [dispatch, successSave]);

  const openModal = (warden) => {
    if (warden._id) {
      setModalVisible(true);
      setId(warden._id);
      setName(warden.name);
      setEmpId(warden.empId);
      setGender(warden.gender);
      setDob(warden.dob);
      setBloodGroup(warden.bloodGroup);
      setContact(warden.contact);
      setJoinDate(warden.joinDate);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setGender();
      setDob();
      setEmpId();
      setContact();
      setJoinDate();
      setBloodGroup();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const warden = {
      _id: id,
      name,
      gender,
      dob,
      empId,
      contact,
      joinDate,
      bloodGroup,
    };
    dispatch(addWarden(warden));
  };

  const deleteHandler = (warden) => {
    dispatch(deleteWarden(warden._id));
    dispatch(listWardens());
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const wardenListData = wardens.map((warden) => {
    return (
      <WardenList
        key={warden._id}
        warden={warden}
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
        data={wardens}
        title="Wardens"
        fullTitle="List of Wardens / Helpers in our Hospital"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
        user={userInfo.user.role === "User"}
      />
      {wardens.length === 0 ? (
        <EmptyData
          name="Wardens"
          title="Add all the available Wardens / Helpers now!"
          data={wardens}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
          user={userInfo.user.role === "User"}
        />
      ) : (
        <Row>{wardenListData}</Row>
      )}
      {modalVisible && (
        <ModalContainer
          title="Wardens"
          show={modalVisible}
          hide={() => setModalVisible(false)}
          size="lg"
          onSubmit={handleSubmit}
          error={errorSave}
          id={id}>
          <Row>
            <Col md={6}>
              <InputComp
                label="Emp ID"
                inputType="text"
                type="text"
                value={empId}
                setValue={setEmpId}
                placeholder="Enter EmpID"
                err={errorSave}
              />
              <InputComp
                label="Emp Name"
                inputType="text"
                type="text"
                value={name}
                setValue={setName}
                placeholder="Enter Name"
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
                label="Date of Birth"
                inputType="text"
                type="date"
                value={dob}
                setValue={setDob}
                err={errorSave}
              />
            </Col>
            <Col md={6}>
              <InputComp
                label="Blood Group"
                inputType="select"
                data={bloodGroups}
                value={bloodGroup}
                setValue={setBloodGroup}
                err={errorSave}
              />
              <InputComp
                label="Joining Date"
                inputType="text"
                type="date"
                name="joinDate"
                value={joinDate}
                setValue={setJoinDate}
                err={errorSave}
              />
              <InputComp
                label="Contact Number"
                inputType="text"
                type="text"
                value={contact}
                setValue={setContact}
                placeholder="Enter EmpID"
                err={errorSave}
              />
            </Col>
          </Row>
        </ModalContainer>
      )}
    </>
  );
};

export default WardenPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmps, deleteEmps, listEmps } from "../../../actions/EmployeeAction";
import ModalContainer from "../../Layout/ModalContainer";
import PageHeader from "../../Layout/PageHeader";
import LoadingPage from "../../Pages/LoadingPage";
import EmployeeList from "./EmployeeList";
import DataList from "../../../misc/DataList";
import EmptyData from "../../../misc/EmptyData";
import { listUsers } from "../../../actions/UserAuthAction";
import { listDepartments } from "../../../actions/DepartmentAction";
import { listDesignations } from "../../../actions/DesignationAction";
import InputComp from "../../../misc/InputComp";
import DataIdList from "../../../misc/DataIdList";
import { Col, Row } from "react-bootstrap";
import ScrollToTop from "../../Layout/ScrollToTOp";
import DataIdSearch from "../../../misc/DataIdSearch";

const EmployeePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [empId, setEmpId] = useState("");
  const [deptId, setDeptId] = useState("");
  const [dob, setDob] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [genders] = useState(["Male", "Female", "Others"]);

  const { userInfo } = useSelector((state) => state.userSignin);
  const { employees, loading } = useSelector((state) => state.employeeList);
  const { users } = useSelector((state) => state.userList);
  const { departments } = useSelector((state) => state.departmentList);
  const { designations } = useSelector((state) => state.designationList);
  const { success: successSave, error: errorSave } = useSelector(
    (state) => state.employeeAdd
  );
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    document.title = "Employees | A S K Hospitals";
    dispatch(listEmps());
    dispatch(listUsers());
    dispatch(listDepartments());
    dispatch(listDesignations());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listEmps());
    }
  }, [dispatch, successSave]);

  const openModal = (employee) => {
    if (employee._id) {
      setModalVisible(true);
      setId(employee._id);
      setName(employee.name);
      setEmail(employee.email.email);
      setEmpId(employee.empId);
      setGender(employee.gender);
      setDob(employee.dob);
      setBloodGroup(employee.bloodGroup);
      setDesignationId(employee.designationId._id);
      setDeptId(employee.deptId._id);
      setContact(employee.contact);
      setJoinDate(employee.joinDate);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setEmail();
      setGender();
      setDob();
      setDesignationId();
      setEmpId();
      setDeptId();
      setContact();
      setJoinDate();
      setBloodGroup();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {
      _id: id,
      name,
      email,
      gender,
      dob,
      designationId,
      empId,
      deptId,
      contact,
      joinDate,
      bloodGroup,
    };
    dispatch(addEmps(employee));
  };

  const deleteHandler = (employee) => {
    dispatch(deleteEmps(employee._id));
    dispatch(listEmps());
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const empsListData = employees.map((emp) => {
    return (
      <EmployeeList
        key={emp._id}
        emp={emp}
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
        data={employees}
        title="Employees"
        fullTitle="List of Employees available in our Hospital"
        openModal={openModal}
        admin={userInfo.user.role === "Admin"}
      />
      {employees.length === 0 ? (
        <EmptyData
          name="Employee"
          title="Add all the available employees now!"
          data={employees}
          openModal={openModal}
          admin={userInfo.user.role === "Admin"}
        />
      ) : (
        <Row>{empsListData}</Row>
      )}
      {modalVisible && (
        <ModalContainer
          title="Employee"
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
              {/* <DataList
                label="Emp Name"
                data={users}
                value={name}
                setValue={setName}
                placeholder="Enter EmpID"
                err={errorSave}
              /> */}
              <DataIdSearch
                label="Email"
                data={users}
                value={email}
                setValue={setEmail}
                err={errorSave}
              />
              <DataList
                label="Emp Name"
                data={users}
                value={name}
                setValue={setName}
                placeholder="Enter EmpID"
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
              <DataIdList
                label="Designation"
                data={designations}
                value={designationId}
                setValue={setDesignationId}
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
              <DataIdList
                label="Department"
                data={departments}
                value={deptId}
                setValue={setDeptId}
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
      <ScrollToTop />
    </>
  );
};

export default EmployeePage;

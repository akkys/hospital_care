import React, { useState } from "react";
import maleNurse from "../../../images/male-emp.jpg";
import femaleNurse from "../../../images/female-emp.jpg";
import DeleteModal from "../../../misc/DeleteModal";
import CardContainer from "../../Layout/CardContainer";
import EmployeeDetails from "./EmployeeDetails";
import { Col } from "react-bootstrap";

const EmployeeList = ({ emp, openModal, deleteHandler, userInfo }) => {
  const [showEmpDetails, setShowEmpDetails] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const admin = userInfo && userInfo.user.role === "Admin";

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleEmpModal = () => {
    setShowEmpDetails(true);
  };

  const closeEmpModal = () => {
    setShowEmpDetails(false);
  };

  const empDetailModal = () => {
    return (
      <EmployeeDetails
        empDetailModal={empDetailModal}
        closeEmpModal={closeEmpModal}
        emp={emp}
        maleNurse={maleNurse}
        femaleNurse={femaleNurse}
        showEmpDetails={showEmpDetails}
        setShowEmpDetails={setShowEmpDetails}
      />
    );
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={emp}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <Col md={3} className=" mb-3">
        <CardContainer
          img={emp.gender === "Male" ? maleNurse : femaleNurse}
          title={emp.name}
          id={emp._id}
          data={emp}
          admin={admin}
          openDeleteModal={openDeleteModal}
          openModal={openModal}
          handleDetailModal={handleEmpModal}>
          <div className="card-details mb-3">
            <h6>
              <label>Emp ID</label>
              <span>: {emp.empId}</span>
            </h6>
            <h6>
              <label>Designation</label>
              <span>: {emp.designationId.name}</span>
            </h6>
            <h6>
              <label>Contact</label>
              <span>: {emp.contact}</span>
            </h6>
          </div>
        </CardContainer>
      </Col>
      {empDetailModal()}
    </>
  );
};

export default EmployeeList;

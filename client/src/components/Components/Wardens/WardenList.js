import React, { useState } from "react";
import maleNurse from "../../../images/male-emp.jpg";
import femaleNurse from "../../../images/female-emp.jpg";
import { Col } from "react-bootstrap";
import CardContainer from "../../Layout/CardContainer";
import DeleteModal from "../../../misc/DeleteModal";
import WardenDetails from "./WardenDetails";

const WardenList = ({ warden, openModal, deleteHandler, userInfo }) => {
  const [showWardenDetails, setShowWardenDetails] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const admin = userInfo && userInfo.user.role === "Admin";

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleWardenModal = () => {
    setShowWardenDetails(true);
  };

  const closeWardenModal = () => {
    setShowWardenDetails(false);
  };

  const wardenDetailModal = () => {
    return (
      <WardenDetails
        wardenDetailModal={wardenDetailModal}
        closeWardenModal={closeWardenModal}
        warden={warden}
        maleNurse={maleNurse}
        femaleNurse={femaleNurse}
        showWardenDetails={showWardenDetails}
        setShowWardenDetails={setShowWardenDetails}
      />
    );
  };
  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={warden}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <Col md={3} className="mt-3 mb-3">
        <CardContainer
          img={warden.gender === "Male" ? maleNurse : femaleNurse}
          title={warden.name}
          id={warden._id}
          data={warden}
          admin={admin}
          openDeleteModal={openDeleteModal}
          openModal={openModal}
          handleDetailModal={handleWardenModal}>
          <div className="card-details mb-3">
            <h6>
              <label>Emp ID</label>
              <span>: {warden.empId}</span>
            </h6>
            <h6>
              <label>Contact</label>
              <span>: {warden.contact}</span>
            </h6>
          </div>
        </CardContainer>
      </Col>
      {wardenDetailModal()}
    </>
  );
};

export default WardenList;

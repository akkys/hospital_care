import React, { useState } from "react";
import DeleteModal from "../../../misc/DeleteModal";
import {
  HiMapPin,
  HiEnvelope,
  HiDevicePhoneMobile,
  HiPhone,
} from "react-icons/hi2";
import CardContainer from "../../Layout/CardContainer";
import { Row } from "react-bootstrap";

const BranchList = ({ branch, openModal, deleteHandler, userInfo }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admin = userInfo && userInfo.user.role === "Admin";

  return (
    <div className="col-md-4 mb-2 mt-2 card-container">
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={branch}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <CardContainer
        data={branch}
        admin={admin}
        openModal={openModal}
        openDeleteModal={openDeleteModal}>
        <Row className="m-auto">
          <h6>
            <HiMapPin size="19px" style={{ marginRight: "10px" }} />
            {branch.address}
          </h6>
          <h6>
            <HiEnvelope size="19px" style={{ marginRight: "10px" }} />
            {branch.email}
          </h6>
          <p className="text-secondary ml-2 mt-2 mb-3">
            For Appointment / Enquiry
          </p>
          <h6>
            <HiDevicePhoneMobile size="19px" style={{ marginRight: "10px" }} />
            {branch.contact}
          </h6>
          <h6>
            <HiPhone size="19px" style={{ marginRight: "10px" }} />
            Help Line : {branch.helpLine}
          </h6>
        </Row>
      </CardContainer>
    </div>
  );
};

export default BranchList;

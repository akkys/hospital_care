import React, { useState } from "react";
import img from "../../../images/doc.png";
import male_doc from "../../../images/male-doc.jpg";
import female_doc from "../../../images/female-doc.jpg";
import DeleteModal from "../../../misc/DeleteModal";
import CardContainer from "../../Layout/CardContainer";
import DocDetails from "./DocDetails";
import { Col } from "react-bootstrap";

const DoctorList = ({ docs, userInfo, openModal, deleteHandler }) => {
  const [showDocDetails, setShowDocDetails] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDocModal = () => {
    setShowDocDetails(true);
  };

  const closeDocModal = () => {
    setShowDocDetails(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admin = userInfo.user.role === "Admin";

  const docDetailModal = () => {
    return (
      <DocDetails
        docDetailModal={docDetailModal}
        closeDocModal={closeDocModal}
        docs={docs}
        img={img}
        showDocDetails={showDocDetails}
        setShowDocDetails={setShowDocDetails}
      />
    );
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={docs}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <Col md={3} className="mb-3">
        <CardContainer
          img={docs.gender === "Male" ? male_doc : female_doc}
          title={docs.name}
          id={docs._id}
          data={docs}
          admin={admin}
          openDeleteModal={openDeleteModal}
          openModal={openModal}
          handleDetailModal={handleDocModal}>
          <div className="card-details mb-3">
            <h6>
              <label>Experience</label>: <span>{docs.exp} Year(s)</span>
            </h6>
            <h6>
              <label>Specialist in</label>: <span>{docs.expert}</span>
            </h6>
            <h6>
              <label>Contact</label>: <span>{docs.contact}</span>
            </h6>
          </div>
        </CardContainer>
      </Col>
      {docDetailModal()}
    </>
  );
};

export default DoctorList;

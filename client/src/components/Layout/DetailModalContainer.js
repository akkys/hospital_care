import React from "react";
import { Modal } from "react-bootstrap";

const DetailModalContainer = ({ show, hide, title, size, children }) => {
  return (
    <>
      <Modal className="modal-container" show={show} onHide={hide} size={size}>
        <Modal.Header closeButton>
          <Modal.Title>{title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default DetailModalContainer;

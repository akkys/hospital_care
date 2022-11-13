import React from "react";
import "./Styles/ModalContainer.css";
import { Modal } from "react-bootstrap";
import ErrorAlert from "../../misc/ErrorAlert";
import ModalBtn from "../../misc/ModalBtn";
import ModalTitle from "../../misc/ModalTitle";

const ModalContainer = ({
  children,
  title,
  show,
  hide,
  size,
  onSubmit,
  error,
  error1,
  error2,
  id,
}) => {
  return (
    <Modal show={show} onHide={hide} size={size} className="modal-container">
      <Modal.Header closeButton>
        <ModalTitle id={id} title={title} />
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {error && <ErrorAlert message={error} />}
          {error1 && <ErrorAlert message={error1} />}
          {error2 && <ErrorAlert message={error2} />}
          {children}
          <ModalBtn id={id} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;

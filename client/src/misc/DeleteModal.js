import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({
  data,
  deleteHandler,
  deleteModalVisible,
  setDeleteModalVisible,
}) => {
  return (
    <Modal
      show={deleteModalVisible}
      onHide={() => setDeleteModalVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger" style={{ fontWeight: "500" }}>
          Confirm Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>This will be deleted permanently. Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setDeleteModalVisible(false)}>
          No, Keep it
        </Button>
        <Button variant="danger" size="sm" onClick={() => deleteHandler(data)}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

import React from "react";
import { Button } from "react-bootstrap";

const ModalBtn = ({ id, closeModal }) => {
  return (
    <>
      {closeModal && (
        <Button
          type="submit"
          variant="outline-secondary"
          size="sm"
          className="mt-3 ml-3 float-right"
          onClick={closeModal}>
          Close
        </Button>
      )}
      <Button
        type="submit"
        variant="info"
        size="sm"
        className="mt-2"
        style={{ float: "right" }}>
        {!id ? "Save" : "Update"}
      </Button>
    </>
  );
};

export default ModalBtn;

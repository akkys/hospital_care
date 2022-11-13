import React from "react";
import { Button } from "react-bootstrap";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

const CardFooterBtn = ({
  data,
  openModal,
  openDeleteModal,
  handleDetailModal,
}) => {
  return (
    <div className="cardFooter">
      {handleDetailModal && (
        <div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleDetailModal}>
            Info &raquo;
          </Button>
        </div>
      )}
      <div></div>
      <div className="cardFooterBtn">
        <span className="text-danger" onClick={() => openDeleteModal(data._id)}>
          <HiTrash
            size={20}
            className="text-danger"
            style={{ marginRight: "15px" }}
          />
        </span>
        <span className="text-success" onClick={() => openModal(data)}>
          <HiPencilSquare size={20} />
        </span>
      </div>
    </div>
  );
};

export default CardFooterBtn;

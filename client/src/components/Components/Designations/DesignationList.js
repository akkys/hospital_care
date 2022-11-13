import React, { useState } from "react";
import DeleteModal from "../../../misc/DeleteModal";
import { HiPencil, HiTrash } from "react-icons/hi2";

const DesignationList = ({ index, designation, deleteHandler, openModal }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={designation}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <tr>
        <td>{index}</td>
        <td>{designation.name}</td>
        <td>
          <HiTrash
            size={19}
            onClick={() => openDeleteModal(designation)}
            style={{ cursor: "pointer", marginRight: "25px" }}
            className="text-danger"
          />
          <HiPencil
            size={19}
            onClick={() => openModal(designation)}
            style={{ cursor: "pointer" }}
            className="text-success"
          />
        </td>
      </tr>
    </>
  );
};

export default DesignationList;

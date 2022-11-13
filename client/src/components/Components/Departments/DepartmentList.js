import React, { useState } from "react";
import DeleteModal from "../../../misc/DeleteModal";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

const DepartmentList = ({ index, dept, deleteHandler, openModal }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={dept}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <tr>
        <td>{index}</td>
        <td>{dept.name}</td>
        <td>
          <HiTrash
            size={19}
            onClick={() => openDeleteModal(dept)}
            style={{ cursor: "pointer", marginRight: "25px" }}
            className="text-danger"
          />
          <HiPencilSquare
            size={19}
            onClick={() => openModal(dept)}
            style={{ cursor: "pointer" }}
            className="text-success"
          />
        </td>
      </tr>
    </>
  );
};

export default DepartmentList;

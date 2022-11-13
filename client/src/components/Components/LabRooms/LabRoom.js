import React, { useState } from "react";
import DeleteModal from "../../../misc/DeleteModal";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

const LabRoom = ({ index, room, openModal, deleteHandler, userInfo }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admin = userInfo.user.role === "Admin";
  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={room}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}

      <tr style={{ textAlign: "center" }}>
        <td>{index}</td>
        <td>{room.num}</td>
        <td>{room.name}</td>
        <td>{room.groups}</td>
        <td>{room.capacity}</td>
        <td>
          {room.fromTime} - {room.toTime}
        </td>
        <td>
          {admin ? (
            <>
              <HiTrash
                size={19}
                onClick={() => openDeleteModal(room)}
                style={{ cursor: "pointer", marginRight: "15px" }}
                className="text-danger"
              />
              <HiPencilSquare
                size={19}
                onClick={() => openModal(room)}
                style={{ cursor: "pointer" }}
                className="text-success"
              />
            </>
          ) : (
            <>
              <HiTrash
                size={19}
                style={{ cursor: "not-allowed", marginRight: "15px" }}
                className="text-secondary"
              />
              <HiPencilSquare
                size={19}
                style={{ cursor: "not-allowed" }}
                className="text-secondary"
              />
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default LabRoom;

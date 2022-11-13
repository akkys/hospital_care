import React, { useState } from "react";
import AppointmentDetails from "./AppointmentDetails";
import { MdArrowRight } from "react-icons/md";
import DeleteModal from "../../../misc/DeleteModal";
import { HiPencilSquare } from "react-icons/hi2";

const AppointmentList = ({ index, appt, openModal, deleteHandler }) => {
  const [showApptDetailModal, setShowApptDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const date = new Date(appt.date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const openApptDetailModal = () => {
    setShowApptDetailModal(true);
  };

  const closeApptDetailModal = () => {
    setShowApptDetailModal(false);
  };

  const apptDetailModal = () => {
    return (
      <AppointmentDetails
        showApptDetailModal={showApptDetailModal}
        setShowApptDetailModal={setShowApptDetailModal}
        closeApptDetailModal={closeApptDetailModal}
        appt={appt}
        date={date}
        openDeleteModal={openDeleteModal}
      />
    );
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={appt}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <tr>
        <td>{index}</td>
        <td className="">
          {date}
          <br />
          <small>
            {appt.fromTime} - {appt.toTime}
          </small>
        </td>
        <td>{appt.name}</td>
        <td>
          <span>{appt.contact}</span>
          <br />
          <span>{appt.email}</span>
        </td>
        <td>{appt.reason}</td>
        <td>{appt.department}</td>
        <td>{appt.status}</td>
        <td>
          <HiPencilSquare
            size={19}
            className="text-success"
            onClick={() => openModal(appt)}
            style={{ cursor: "pointer", margin: "auto" }}
          />
        </td>
        <td
          onClick={openApptDetailModal}
          className="btn-link"
          style={{ cursor: "pointer", textAlign: "center" }}>
          Info
          <MdArrowRight size="20px" />
        </td>
      </tr>
      {apptDetailModal()}
    </>
  );
};

export default AppointmentList;

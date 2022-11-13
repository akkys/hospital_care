import React, { useState } from "react";
import DeleteModal from "../../../misc/DeleteModal";
import PatientDetails from "./PatientDetails";
import { HiPencilSquare } from "react-icons/hi2";
import { MdArrowRight } from "react-icons/md";

const PatientList = ({ index, patient, openModal, deleteHandler }) => {
  const [showPatientDetailModal, setShowPatientDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openPatientDetailModal = () => {
    setShowPatientDetailModal(true);
  };

  const closePatientDetailModal = () => {
    setShowPatientDetailModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const admitDate = new Date(patient.admitDate).toLocaleString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });

  const dob = new Date(patient.dob).toLocaleString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });

  const patientDetailModal = () => {
    return (
      <PatientDetails
        showPatientDetailModal={showPatientDetailModal}
        closePatientDetailModal={closePatientDetailModal}
        patient={patient}
        admitDate={admitDate}
        dob={dob}
        openDeleteModal={openDeleteModal}
      />
    );
  };
  return (
    <>
      {deleteModal && (
        <DeleteModal
          deleteHandler={deleteHandler}
          data={patient}
          deleteModalVisible={deleteModal}
          setDeleteModalVisible={setDeleteModal}
        />
      )}
      <tr>
        <td>{index}</td>
        <td>{patient.pid}</td>
        <td>{patient.name}</td>
        <td>{admitDate}</td>
        <td>{patient.roomNum}</td>
        {patient.status === "Discharged" ? (
          <td className="text-danger">{patient.status}</td>
        ) : (
          <td className="text-success">{patient.status}</td>
        )}
        <td>
          <HiPencilSquare
            size={19}
            className="text-success"
            onClick={() => openModal(patient)}
            style={{ cursor: "pointer", margin: "auto" }}
          />
        </td>
        <td
          className="btn-link"
          onClick={openPatientDetailModal}
          style={{ cursor: "pointer" }}>
          Info
          <MdArrowRight size="20px" />
        </td>
      </tr>
      {patientDetailModal()}
    </>
  );
};

export default PatientList;

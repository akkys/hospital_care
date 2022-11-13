import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const PatientDetails = ({
  showPatientDetailModal,
  closePatientDetailModal,
  patient,
  admitDate,
  dob,
  openDeleteModal,
}) => {
  return (
    <Modal
      className="modal-container patient-modal"
      show={showPatientDetailModal}
      onHide={closePatientDetailModal}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <div>
              <label>Name</label>
              <span>: {patient.name}</span>
            </div>
            <div>
              <label>Contact</label>
              <span>: {patient.contact}</span>
            </div>
            <div>
              <label>Gender</label>
              <span>: {patient.gender}</span>
            </div>
            <div>
              <label>Age</label>
              <span>: {patient.age}</span>
            </div>
            <div>
              <label>Address</label>
              <span>: {patient.address}</span>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>Patient ID</label>
              <span>: {patient.pid}</span>
            </div>
            <div>
              <label>Admission Date</label>
              <span>: {admitDate}</span>
            </div>
            <div>
              <label>Room No.</label>
              <span>: {patient.roomNum}</span>
            </div>
            <div>
              <label>Room Type</label>
              <span>: {patient.roomType}</span>
            </div>
            <div>
              <label>Treated By</label>
              <span>: Dr. {patient.docName}</span>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6} className="mb-3">
            <h6>Personal Details </h6>
            <hr />
            <div>
              <label>D.O.B</label>
              <span>: {dob}</span>
            </div>
            <div>
              <label>Blood Group</label>
              <span>: {patient.bloodGroup}</span>
            </div>
            <div>
              <label>Marital Status</label>
              <span>: {patient.maritalStatus}</span>
            </div>
            <div>
              <label>Admit Reason</label>
              <span>: {patient.admitReason}</span>
            </div>
            <div>
              <label>Current Medication</label>
              <span>: {patient.pastMedication}</span>
            </div>
          </Col>
          <Col md={6}>
            <h6>Emergency Contact</h6>
            <hr />
            <div>
              <label>Contact Name</label>
              <span>
                :{" "}
                {patient.emergencyName
                  ? patient.emergencyName
                  : "Not Mentioned"}
              </span>
            </div>
            <div>
              <label>Number</label>
              <span>
                :{" "}
                {patient.emergencyContact
                  ? patient.emergencyContact
                  : "Not Mentioned"}
              </span>
            </div>
            <div>
              <label>Relationship</label>
              <span>
                :{" "}
                {patient.relationship ? patient.relationship : "Not Mentioned"}
              </span>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => openDeleteModal(patient._id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientDetails;

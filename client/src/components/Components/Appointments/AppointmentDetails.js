import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const AppointmentDetails = ({
  appt,
  showApptDetailModal,
  closeApptDetailModal,
  date,
  openDeleteModal,
}) => {
  return (
    <Modal
      className="modal-container appt-modal"
      show={showApptDetailModal}
      onHide={closeApptDetailModal}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <div>
              <label>Name</label>
              <span>: {appt.name}</span>
            </div>
            <div>
              <label>Contact</label>
              <span>: {appt.contact}</span>
            </div>
            <div>
              <label>Email</label>
              {appt.email ? (
                <span>: {appt.email}</span>
              ) : (
                <span>: Not Mentioned</span>
              )}
            </div>
            <div>
              <label>Address</label>
              <span>: {appt.address}</span>
            </div>
            <div>
              <label>City</label>
              <span>: {appt.city}</span>
            </div>
            <div>
              <label>Zipcode</label>
              <span>: {appt.zipcode}</span>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>Date</label>
              <span>: {date}</span>
            </div>
            <div>
              <label>Timings</label>
              <span>
                : From {appt.fromTime} To {appt.toTime}
              </span>
            </div>
            <div>
              <label>Reason</label>
              <span>: {appt.reason}</span>
            </div>
            <div>
              <label>Doctor</label>
              <span>: Dr. {appt.docName}</span>
            </div>
            <div>
              <label>Department</label>
              <span>: {appt.department}</span>
            </div>
            <div>
              <label>Status</label>
              <span>: {appt.status}</span>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => openDeleteModal(appt._id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetails;

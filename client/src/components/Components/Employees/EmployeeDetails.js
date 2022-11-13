import React from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import DetailModalContainer from "../../Layout/DetailModalContainer";

const EmployeeDetails = ({
  showEmpDetails,
  closeEmpModal,
  emp,
  maleNurse,
  femaleNurse,
}) => {
  const dateOfJoin = new Date(emp.joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });
  const dateOfBirth = new Date(emp.dob).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });

  return (
    <>
      <DetailModalContainer
        show={showEmpDetails}
        hide={closeEmpModal}
        title="Employee"
        size="md"
        closeModal={closeEmpModal}>
        <div className="mb-3 mt-3 doc-card-container">
          <Row>
            <Col md={4}>
              <img
                src={emp.gender === "Male" ? maleNurse : femaleNurse}
                className="doc-card-img"
                alt="..."
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <h5>{emp.name}</h5>
                <h6>
                  <label>Emp ID</label>
                  <span>: {emp.empId}</span>
                </h6>
                <h6>
                  <label>Designation</label>
                  <span>: {emp.designationId.name}</span>
                </h6>
                <h6>
                  <label>Joined Date</label>
                  <span>: {dateOfJoin}</span>
                </h6>
              </Card.Body>
            </Col>
          </Row>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h6>
                  <label>D.O.B</label>
                  <span>: {dateOfBirth}</span>
                </h6>
                <h6>
                  <label>Gender</label>
                  <span>: {emp.gender}</span>
                </h6>
                <h6>
                  <label>Department</label>
                  <span>: {emp.deptId.name}</span>
                </h6>
              </Col>
              <Col md={6}>
                <h6>
                  <label>Blood</label>
                  <span>: {emp.bloodGroup}</span>
                </h6>
                <h6>
                  <label>Phone</label>
                  <span>: {emp.contact}</span>
                </h6>
                <h6>
                  <label>Email</label>
                  <span>: {emp.email && emp.email.email}</span>
                </h6>
              </Col>
            </Row>
          </Card.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={closeEmpModal}>
            Close
          </Button>
        </Modal.Footer>
      </DetailModalContainer>
    </>
  );
};

export default EmployeeDetails;

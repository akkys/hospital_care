import React from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import DetailModalContainer from "../../Layout/DetailModalContainer";

const WardenDetails = ({
  showWardenDetails,
  closeWardenModal,
  warden,
  maleNurse,
  femaleNurse,
}) => {
  const dateOfJoin = new Date(warden.joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });
  const dateOfBirth = new Date(warden.dob).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });
  console.log("wl", warden);
  return (
    <>
      <DetailModalContainer
        show={showWardenDetails}
        hide={closeWardenModal}
        title="Warden"
        size="md"
        closeModal={closeWardenModal}>
        <div className="mb-3 mt-3 doc-card-container">
          <Row>
            <Col md={4}>
              <img
                src={warden.gender === "Male" ? maleNurse : femaleNurse}
                className="doc-card-img"
                alt="..."
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <h5>{warden.name}</h5>
                <h6>
                  <label>Emp ID</label>
                  <span>: {warden.empId}</span>
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
              <Col md={7}>
                <h6>
                  <label>D.O.B</label>
                  <span>: {dateOfBirth}</span>
                </h6>
                <h6>
                  <label>Gender : </label>
                  <span>: {warden.gender}</span>
                </h6>
              </Col>
              <Col md={5}>
                <h6>
                  <label>Blood :</label> <span>: {warden.bloodGroup}</span>
                </h6>
                <h6>
                  <label>Phone : </label>
                  <span>: {warden.contact}</span>
                </h6>
              </Col>
            </Row>
          </Card.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={closeWardenModal}>
            Close
          </Button>
        </Modal.Footer>
      </DetailModalContainer>
    </>
  );
};

export default WardenDetails;

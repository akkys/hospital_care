import React from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import DetailModalContainer from "../../Layout/DetailModalContainer";

const DocDetails = ({ showDocDetails, closeDocModal, docs, img }) => {
  return (
    <DetailModalContainer
      show={showDocDetails}
      hide={closeDocModal}
      title="Doctor"
      size="md"
      closeModal={closeDocModal}>
      <div className="mt-3 doc-card-container">
        <Row>
          <Col md={4}>
            <img src={img} className="doc-card-img" alt="..." />
          </Col>
          <Col md={8}>
            <Card.Body>
              <h5>Dr. {docs.name}</h5>
              <h6>
                <label>Experience </label>
                <span>: {docs.exp} Year(s)</span>
              </h6>
              <h6>
                <label>Specialist in </label>
                <span>: {docs.expert}</span>
              </h6>
              <h6>
                <label>Qualification </label>
                <span>: {docs.qualification}</span>
              </h6>
            </Card.Body>
          </Col>
        </Row>
        <Card.Body>
          <Row>
            <Col md={7}>
              <h6>
                <label>Contact </label>
                <span>: {docs.contact}</span>
              </h6>
              <h6>
                <label>About </label>
                <span>: {docs.desc}</span>
              </h6>
            </Col>
            <Col md={5}>
              <h6>
                <label>Available at </label>
                <span>: {docs.available}</span>
              </h6>
              <h6>
                <label>Duty Timings</label>
                <span>
                  : {docs.time}
                  {""} Hrs.
                </span>
              </h6>
            </Col>
          </Row>
        </Card.Body>
      </div>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={closeDocModal}>
          Close
        </Button>
      </Modal.Footer>
    </DetailModalContainer>
  );
};

export default DocDetails;
